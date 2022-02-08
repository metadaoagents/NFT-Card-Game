import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import MemoryToken from '../abis/MemoryToken.json'
import brain from '../brain.png'

import blank from '../blank.png'

const CARD_ARRAY = [

  
 
 
  {
    name: '0',
    img: '/images/0000.jpg'
  },
  {
    name: '0',
    img: '/images/0000.jpg'
  },
  {
    name: '1',
    img: '/images/0001.jpg'
  },
  {
    name: '1',
    img: '/images/0001.jpg'
  },
  {
    name: '14',
    img: '/images/0014.jpg'
  },
  {
    name: '14',
    img: '/images/0014.jpg'
  },
  {
    name: '3',
    img: '/images/0003.jpg'
  },
  {
    name: '3',
    img: '/images/0003.jpg'
  },
  {
    name: '4',
    img: '/images/0004.jpg'
  },
  {
    name: '4',
    img: '/images/0004.jpg'
  },
  {
    name: '15',
    img: '/images/0015.jpg'
  },
  {
    name: '15',
    img: '/images/0015.jpg'
  },
  {
    name: '16',
    img: '/images/0016.jpg'
  },
  {
    name: '16',
    img: '/images/0016.jpg'
  },
  {
    name: '7',
    img: '/images/0007.jpg'
  },
  {
    name: '7',
    img: '/images/0007.jpg'
  },
  {
    name: '8',
    img: '/images/0008.jpg'
  },
  {
    name: '8',
    img: '/images/0008.jpg'
  },
  {
    name: '9',
    img: '/images/0009.jpg'
  },
  {
    name: '9',
    img: '/images/0009.jpg'
  },
  {
    name: '10',
    img: '/images/0010.jpg'
  },
  {
    name: '10',
    img: '/images/0010.jpg'
  },
  {
    name: '11',
    img: '/images/0011.jpg'
  },
  {
    name: '11',
    img: '/images/0011.jpg'
  },
  {
    name: '12',
    img: '/images/0012.jpg'
  },
  {
    name: '12',
    img: '/images/0012.jpg'
  },
  {
    name: '17',
    img: '/images/0017.jpg'
  },
  {
    name: '17',
    img: '/images/0017.jpg'
  },
  {
    name: '18',
    img: '/images/0018.jpg'
  },
  {
    name: '18',
    img: '/images/0018.jpg'
  },
  {
    name: '19',
    img: '/images/0019.jpg'
  },
  {
    name: '19',
    img: '/images/0019.jpg'
  },
  {
    name: '20',
    img: '/images/0020.jpg'
  },
  {
    name: '20',
    img: '/images/0020.jpg'
  },
  {
    name: '21',
    img: '/images/0021.jpg'
  },
  {
    name: '21',
    img: '/images/0021.jpg'
  },
  {
    name: '22',
    img: '/images/0022.jpg'
  },
  {
    name: '22',
    img: '/images/0022.jpg'
  },
  {
    name: '26',
    img: '/images/0026.jpg'
  },
  {
    name: '26',
    img: '/images/0026.jpg'
  },
  {
    name: '27',
    img: '/images/0027.jpg'
  },
  {
    name: '27',
    img: '/images/0027.jpg'
  },
  {
    name: '28',
    img: '/images/0028.jpg'
  },
  {
    name: '28',
    img: '/images/0028.jpg'
  },
 
  {
    name: '30',
    img: '/images/0030.jpg'
  },
  {
    name: '30',
    img: '/images/0030.jpg'
  },
  {
    name: '31',
    img: '/images/0031.jpg'
  },
  {
    name: '31',
    img: '/images/0031.jpg'
  },

 
  
] ///18x7(good size)
const styleWhite = {color : 'white'};
class App extends Component {


  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Load smart contract
    const networkId = await web3.eth.net.getId()
    const networkData = MemoryToken.networks[networkId]
    if(networkData) {
      const abi = MemoryToken.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      this.setState({ token })
      const totalSupply = await token.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Tokens
      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }
    } else {
      alert('Smart contract not deployed to detected network.')
    }
  }

  chooseImage = (cardId) => {
    cardId = cardId.toString()
    if(this.state.cardsWon.includes(cardId)) {
      return window.location.origin + '/images/white.png'
    }
    else if(this.state.cardsChosenId.includes(cardId)) {
      return CARD_ARRAY[cardId].img
    } else {
      return window.location.origin + '/images/blank.png'
    }
  }

  flipCard = async (cardId) => {
    let alreadyChosen = this.state.cardsChosen.length

    this.setState({
      cardsChosen: [...this.state.cardsChosen, this.state.cardArray[cardId].name],
      cardsChosenId: [...this.state.cardsChosenId, cardId]
    })

    if (alreadyChosen === 1) {
      setTimeout(this.checkForMatch, 100)
    }
  }


  checkForMatch = async () => {
    const optionOneId = this.state.cardsChosenId[0]
    const optionTwoId = this.state.cardsChosenId[1]

    if(optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
    } else if (this.state.cardsChosen[0] === this.state.cardsChosen[1]) {
      alert('You found a match')
      this.state.token.methods.mint(
        this.state.account,
        window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      )
       // .send({ from: this.state.account })
       .send({from: this.state.account, value: 10000000000000000})
      .on('transactionHash', (hash) => {
        this.setState({
          cardsWon: [...this.state.cardsWon, optionOneId, optionTwoId],
          tokenURIs: [...this.state.tokenURIs, CARD_ARRAY[optionOneId].img]
        })
      })
    } else {
      sleep(10000);
      alert('Sorry, try again')
    }
    this.setState({
      cardsChosen: [],
      cardsChosenId: []
    })
    if (this.state.cardsWon.length === CARD_ARRAY.length) {
      alert('Congratulations! You found them all! Welcome to the alpha group buoy!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: []
    }
  }



  render() {
    return (
<div>

 
        <nav  className="navbar navbar-dark fixed-top  flex-md-nowrap ">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
          
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src={blank} width="43" height="43" className="d-inline-block align-top" alt="" />
          &nbsp; META AGENTS NFTs
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-muted"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                

                



                <div className="grid mb-4" >

                  { this.state.cardArray.map((card, key) => {
                    return(
                      <img

                      style={{
                            
                        height: 138,
                        width: 114
                      }}
                     
                        key={key}
                        src={this.chooseImage(key)}
                        data-id={key}
                        onClick={(event) => {
                          let cardId = event.target.getAttribute('data-id')
                          if(!this.state.cardsWon.includes(cardId.toString())) {
                            this.flipCard(cardId)
                          }
                        }}
                      />
                    )
                  })}


                </div>

                <div>

                  <h5 style={styleWhite}>Tokens Collected:<span style={styleWhite}id="result">&nbsp;{this.state.tokenURIs.length}</span></h5>

                  <div className="grid mb-4" >

                  { this.state.tokenURIs.map((tokenURI, key) => {
                      console.log(tokenURI)
                      console.log(tokenURI.split('http://localhost:3000'))
                      console.log(tokenURI.split('http://localhost:3000')[1])
                      
                      // var link = tokenURI.split('http://localhost:3000')
                      // var link2 = link[1]
                      return(
                        
                        <img 
                          key={key}
                          // src={tokenURI.split('http://localhost:3000')}
                          src={tokenURI}
                          style={{
                            
                            height: 138,
                            width: 114
                          }}
                        />
                      )
                    })}


                    

                  </div>

                </div>

              </div>

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
