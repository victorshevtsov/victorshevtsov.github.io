// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const tokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'; // LINK | ChainLink Token @ Goerli network

App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    App.account = (await web3.eth.getAccounts())[0]
    console.log(App.account)
  },

  loadContract: async () => {
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)
    App.todoList = await App.contracts.TodoList.deployed()
  },

  render: async () => {
    if (App.loading) {
      return
    }

    App.setLoading(true)

    $('#account').html(App.account)
    await App.renderTasks()

    App.setLoading(false)
  },

  renderTasks: async () => {
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    let tasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await App.todoList.tasks(i)
      tasks.push(task);
    }

    tasks = tasks.sort((a, b) => a.content - b.content)

    tasks.forEach(task => {
      const $task = $taskTemplate.clone()
      $task.find('.content').html(task.content)
      $task.find('input')
        .prop('name', task.id)
        .prop('checked', task.completed)
        .on('click', App.toggleCompleted)

      if (task.completed) {
        $('#completedTaskList').append($task)
      } else {
        $('#taskList').append($task)
      }

      $task.show()
    })
  },

  createTask: async () => {
    App.setLoading(true)

    const content = $('#newTask').val()
    await App.todoList.createTask(content, { from: App.account })
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const id = e.target.name;
    await App.todoList.toggleCompleted(id, { from: App.account })

    window.location.reload()
  },

  transferERC20: async (e) => {
    App.setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, signer);
    const decimals = await contract.decimals(walletAddress);

    const walletAddress = provider.provider.selectedAddress;

    var rawTx = await contract.populateTransaction.transfer(walletAddress, ethers.utils.parseUnits("0.01", decimals));

    const result = await signer.sendTransaction(rawTx);
    console.log(result);

    window.location.reload()
  },

  setLoading: (loading) => {
    App.loading = loading
    const loader = $('#loader')
    const content = $('#content')
    if (loading) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
