import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";



import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Builder from  './contract/Builder.abi.json';
import Materials from './components/Materials';
import Newmaterial from './components/Newmaterial';




const ERC20_DECIMALS = 18;


const contractAddress = "0x36cae3FbD9a77D3C29b2FAF437E607e64ADdFC87";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [materials, setMaterials] = useState([]);



  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
     console.log("Error Occurred");
     
    }
  };

  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(Builder, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });

  const getMaterial = (async () => {
    const materialsLength = await contract.methods.getmaterialsLength().call();
    const _materiall = []
    for (let index = 0; index <  materialsLength; index++) {
      console.log(materialsLength);
      let _materials = new Promise(async (resolve, reject) => {
      let material = await contract.methods.getMaterial(index).call();

        resolve({
          index: index,
          creator:material[0],
          image:material[1],
          name:material[2],
          quantity:material[3],
          location:material[4],
          price:material[5],
          forSale:material[6]
         
             
        });
      });
      _materiall.push(_materials);
    }

    const materials = await Promise.all(_materiall);
    setMaterials(materials);
    console.log(materials)
  });

  const addMaterial = async (
    _image,
    _name,
    _quantity,
    _location,
    price
  ) => {

    const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addMaterial(_image, _name, _quantity, _location, _price)
        .send({ from: address });
       getMaterial();
    } catch (error) {
      console.log(error);
    }
  };

  const SwitchForsale = async (_index) => {
    try {
      await contract.methods.FlagForSale(_index).send({ from: address });
      getMaterial();
      getBalance();
    } catch (error) {
      console.log(error);
    }};

    
    useEffect(() => {
        connectToWallet();
      }, []);
    
      useEffect(() => {
        if (kit && address) {
          getBalance();
         
        }
      }, [kit, address]);
    
      useEffect(() => {
        if (contract) {
          getMaterial();
        }
      }, [contract]);  


    const buyMaterial = async (_index,) => {
        try {
          const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
        
          
          await cUSDContract.methods
            .approve(contractAddress, materials[_index].price)
            .send({ from: address });
          await contract.methods.buyMaterial(_index).send({ from: address });
          getMaterial();
          getBalance();
        } catch (error) {
          console.log(error)
        }};


        return (
            <div>
              <Navbar balance = {cUSDBalance} />
              <Materials materials ={materials}
              buyMaterial = {buyMaterial}
              SwitchForsale= {SwitchForsale}
               
              />
               <Newmaterial addMaterial = {addMaterial}
               
      />
            </div>
            )
      
      
      }
      export default App;
      
