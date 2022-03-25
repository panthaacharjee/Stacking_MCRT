import React, { useState , useEffect } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import stakingContractJson from '../../ABI/MCRTStake.json';
import tokenContractJson from '../../ABI/MCRTToken.json';
import { ethers } from 'ethers';
import logo from "../../assets/favicon.ico";
import "./index.scss";
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


//Images
import pic from "../../assets/pic.png"

import like from '../../assets/Shape.png';
import graph from '../../assets/GraphIncrease.png'
import reward from '../../assets/Reward.png'
import withdrawClaim from '../../assets/Withdraw.png'


const VStaking = (walletAddress) => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [visibleOptionDropdown, setVisibleOptionDropdown] = useState(false);

  const [dropdownValue, setDropdownValue] = useState(0);
  const [dropdownOptionValue, setDropdownOptionValue] = useState(0);

  const [address, setWalletAddress] = useState(null);
  const [approved, setApproved] = useState(false);

  const [isapproveloading, setIsApproveLoading] = useState(false);
  const [isstakingloading, setIsStakingLoading] = useState(false);
  const [isclaimloading, setIsClaimLoading] = useState(false);
  const [iswithdrawloading, setWithdrawLoading] = useState(false);
  const [amnt, setAmntInput] = useState(0);

  const [stakedMCRT, setStakedMCRT] = useState(0);
  const [earnedMCRT, setEarnedMCRT] = useState(0);

  const [CurrentMCRT30EarnedToken,setCurrentMCRT30EarnedToken] = useState(0);
  const [CurrentMCRT90EarnedToken,setCurrentMCRT90EarnedToken] = useState(0);
  const [CurrentMCRT180EarnedToken,setCurrentMCRT180EarnedToken] = useState(0);
  const [CurrentMCRT365EarnedToken,setCurrentMCRT365EarnedToken] = useState(0);
  const [CurrentMCRT1095EarnedToken,setCurrentMCRT1095EarnedToken] = useState(0);
  const [CurrentMCRT1825EarnedToken,setCurrentMCRT1825EarnedToken] = useState(0);

  const [CurrentMCRT180EarnedPoint,setCurrentMCRT180EarnedPoint] = useState(0);
  const [CurrentMCRT365EarnedPoint,setCurrentMCRT365EarnedPoint] = useState(0);
  const [CurrentMCRT1095EarnedPoint,setCurrentMCRT1095EarnedPoint] = useState(0);
  const [CurrentMCRT1825EarnedPoint,setCurrentMCRT1825EarnedPoint] = useState(0);

  const [startTime30Staking, setstartTime30Staking] = useState(0);
  const [startTime90Staking, setstartTime90Staking] = useState(0);
  const [startTime180Staking, setstartTime180Staking] = useState(0);
  const [startTime365Staking, setstartTime365Staking] = useState(0);
  const [startTime1095Staking, setstartTime1095Staking] = useState(0);
  const [startTime1825Staking, setstartTime1825Staking] = useState(0);


  const [MCRT30StakedT,setMCRT30StakedT] = useState(0);
  const [MCRT90StakedT,setMCRT90StakedT] = useState(0);
  const [MCRT180StakedT,setMCRT180StakedT] = useState(0);
  const [MCRT365StakedT,setMCRT365StakedT] = useState(0);
  const [MCRT1095StakedT,setMCRT1095StakedT] = useState(0);
  const [MCRT1825StakedT,setMCRT1825StakedT] = useState(0);


  const [MCRT180StakedP,setMCRT180StakedP] = useState(0);
  const [MCRT365StakedP,setMCRT365StakedP] = useState(0);
  const [MCRT1095StakedP,setMCRT1095StakedP] = useState(0);
  const [MCRT1825StakedP,setMCRT1825StakedP] = useState(0);

  const [apr30,setapr30] = useState(0);
  const [apr90,setapr90] = useState(0);
  const [apr180,setapr180] = useState(0);
  const [apr365,setapr365] = useState(0);
  const [apr1095,setapr1095] = useState(0);
  const [apr1825,setapr1825] = useState(0);

  const [MCRTPrice, setMCRTPrice] = useState(0);
  const [MCRTDecimals, setMCRTDecimals] = useState(0);
  const [PointPrice, setPointPrice] = useState(0);
  const [PointDecimals, setPointDecimals] = useState(0);

  const [isActive, setIsAcitve] = useState(false);
  const [status, setStatus] = useState(false);
  

  const getStakedMCRT = async(period,option) => {
    const address = walletAddress.walletAddress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(
      stakingContractJson.contract,
      stakingContractJson.abi,
      signer
    );
    

    let ret = await stakingContract.yourStakedMCRT(address,period,option);

    if(period === 30){
      if(option === 0){
        setCurrentMCRT30EarnedToken(ret[4]/Math.pow(10,18));
        setstartTime30Staking(ret[3].toNumber());
        setMCRT30StakedT(ret[1]/Math.pow(10,18));
        setapr30(ret[0].toNumber());
      } else if (option ===1) {
 
      }

    } else if(period === 90){
      if(option === 0){
        setCurrentMCRT90EarnedToken(ret[4]/Math.pow(10,18));
        setstartTime90Staking(ret[3].toNumber());
        setMCRT90StakedT(ret[1]/Math.pow(10,18));
        setapr90(ret[0].toNumber());
      } else if (option ===1) {
      }

    } else if(period === 180 ){
      if (option === 0){
        setCurrentMCRT180EarnedToken(ret[4]/Math.pow(10,18));
        setstartTime180Staking(ret[3].toNumber());
        setMCRT180StakedT(ret[1]/Math.pow(10,18));
        setapr180(ret[0].toNumber());
      } else if (option ===1){
          setCurrentMCRT180EarnedPoint(ret[4].toNumber());
          setstartTime180Staking(ret[3].toNumber());
          setMCRT180StakedP(ret[1]/Math.pow(10,18));
          setapr180(ret[0].toNumber());
      }

    } else if(period === 365 ){
        if (option === 0){
          setCurrentMCRT365EarnedToken(ret[4]/Math.pow(10,18));
          setstartTime365Staking(ret[3].toNumber());
          setMCRT365StakedT(ret[1]/Math.pow(10,18));
          setapr365(ret[0].toNumber());
        } else if (option ===1){
          setCurrentMCRT365EarnedPoint(ret[4].toNumber());
          setstartTime365Staking(ret[3].toNumber());
          setMCRT365StakedP(ret[1]/Math.pow(10,18));
          setapr365(ret[0].toNumber());
        }
        
    } else if(period === 1095 ){
        if (option === 0){
          setCurrentMCRT1095EarnedToken(ret[4]/Math.pow(10,18));
          setstartTime1095Staking(ret[3].toNumber());
          setMCRT1095StakedT(ret[1]/Math.pow(10,18));
          setapr1095(ret[0].toNumber());
        } else if (option ===1){
          setCurrentMCRT1095EarnedPoint(ret[4].toNumber());
          setstartTime1095Staking(ret[3].toNumber());
          setMCRT1095StakedP(ret[1]/Math.pow(10,18));
          setapr1095(ret[0].toNumber());
        }
        
    } else if(period === 1825 ){
        if (option === 0){
          setCurrentMCRT1825EarnedToken(ret[4]/Math.pow(10,18));
          setstartTime1825Staking(ret[3].toNumber());
          setMCRT1825StakedT(ret[1]/Math.pow(10,18));
          setapr1825(ret[0].toNumber());
        } else if (option ===1){
          setCurrentMCRT1825EarnedPoint(ret[4].toNumber());
          setstartTime1825Staking(ret[3].toNumber());
          setMCRT1825StakedP(ret[1]/Math.pow(10,18));
          setapr1825(ret[0].toNumber());
        }
        console.log(period, option);
    }
    setIsAcitve(true);
  }
  const calculateEarned = () => {
    if (dropdownValue === 0){
      if(dropdownOptionValue == 0){
        const currentTime = new Date().getTime() ;
        let stakingTime = currentTime/1000-startTime30Staking;
        if (startTime30Staking === 0){
          stakingTime = 0;
        }
        if(stakingTime <0){
          stakingTime = 0;
        }

        let reward = CurrentMCRT30EarnedToken + stakingTime * MCRT30StakedT * apr30 / 86400/36500;
        setStakedMCRT(MCRT30StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        setStakedMCRT("0.0000");
        setEarnedMCRT("0");
      }
    } else if (dropdownValue === 1){
      if(dropdownOptionValue == 0){
        const currentTime = new Date().getTime() ;
        let stakingTime = currentTime/1000-startTime90Staking;
        if (startTime90Staking === 0){
          stakingTime = 0;
        }
        if(stakingTime <0){
          stakingTime = 0;
        }

        let reward = CurrentMCRT90EarnedToken + stakingTime * MCRT90StakedT * apr90 / 86400/36500;
        setStakedMCRT(MCRT90StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        setStakedMCRT("0.0000");
        setEarnedMCRT("0");
      }
    } else if (dropdownValue === 2){
      const currentTime = new Date().getTime() ;
      let stakingTime = currentTime/1000-startTime180Staking;
      if (startTime180Staking === 0){
        stakingTime = 0;
      }
      if(stakingTime <0){
        stakingTime = 0;
      }

      if(dropdownOptionValue == 0){
        let reward = CurrentMCRT180EarnedToken + stakingTime * MCRT180StakedT * apr180 / 86400/36500;
        setStakedMCRT(MCRT180StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        let reward = CurrentMCRT180EarnedPoint + stakingTime * MCRT180StakedP * apr180 / 86400/36500 * MCRTPrice * Math.pow(10, PointDecimals) / PointPrice / Math.pow(10, MCRTDecimals);
        setStakedMCRT(MCRT180StakedP.toFixed(4));
        setEarnedMCRT(reward.toFixed(0));
      }

    } else if (dropdownValue === 3){
      const currentTime = new Date().getTime() ;
      let stakingTime = currentTime/1000-startTime365Staking;
      if (startTime365Staking === 0){
        stakingTime = 0;
      }
      if(stakingTime <0){
        stakingTime = 0;
      }
      if(dropdownOptionValue == 0){
        let reward = CurrentMCRT365EarnedToken + stakingTime * MCRT365StakedT * apr365 / 86400/36500;
        setStakedMCRT(MCRT365StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        let reward = CurrentMCRT365EarnedPoint + stakingTime * MCRT365StakedP * apr365 / 86400/36500 * MCRTPrice * Math.pow(10, PointDecimals) / PointPrice / Math.pow(10, MCRTDecimals);
        setStakedMCRT(MCRT365StakedP.toFixed(4));
        setEarnedMCRT(reward.toFixed(0));
      }
    } else if (dropdownValue === 4){
      const currentTime = new Date().getTime() ;
      let stakingTime = currentTime/1000-startTime1095Staking;
      if (startTime1095Staking === 0){
        stakingTime = 0;
      }
      if(stakingTime <0){
        stakingTime = 0;
      }
      if(dropdownOptionValue == 0){
        let reward = CurrentMCRT1095EarnedToken + stakingTime * MCRT1095StakedT * apr1095 / 86400/36500;
        setStakedMCRT(MCRT1095StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        let reward = CurrentMCRT1095EarnedPoint + stakingTime * MCRT1095StakedP * apr1095 / 86400/36500 * MCRTPrice * Math.pow(10, PointDecimals) / PointPrice / Math.pow(10, MCRTDecimals);
        setStakedMCRT(MCRT1095StakedP.toFixed(4));
        setEarnedMCRT(reward.toFixed(0));
      }
    } else if (dropdownValue === 5){
      const currentTime = new Date().getTime() ;
      let stakingTime = currentTime/1000-startTime1825Staking;
      if (startTime1825Staking === 0){
        stakingTime = 0;
      }
      if(stakingTime <0){
        stakingTime = 0;
      }
      if(dropdownOptionValue == 0){
        let reward = CurrentMCRT1825EarnedToken + stakingTime * MCRT1825StakedT * apr1825 / 86400/36500;
        setStakedMCRT(MCRT1825StakedT.toFixed(4));
        setEarnedMCRT(reward.toFixed(4));
      } else {
        let reward = CurrentMCRT1825EarnedPoint + stakingTime * MCRT1825StakedP * apr1825 / 86400/36500 * MCRTPrice * Math.pow(10, PointDecimals) / PointPrice / Math.pow(10, MCRTDecimals);
        setStakedMCRT(MCRT1825StakedP.toFixed(4));
        setEarnedMCRT(reward.toFixed(0));
      }
    }
  }
  const approve = async() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(
      tokenContractJson.contract,
      tokenContractJson.abi,
      signer
    );
    setIsApproveLoading(true);
    try {
      await tokenContract.approve(stakingContractJson.contract, ethers.utils.parseUnits('500000000', 18));
      toast.success("Approve is Success!, You can stake the token since now!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });
    } catch (error) {
      toast.error(error["data"]["message"].split(":")[2], {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });
    }
    setApproved(true);
    setTimeout(() => setIsApproveLoading(false),4000);
  }
  const approveToast = () => {
    toast.error("already approved!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "dark",
      transition: Flip,
      });
  }
  const renderApprove = () => {
    if(approved){
      return(
          <button onClick={()=>approveToast()} ></button>
      );
    } else {
      return(
        <button onClick={()=>approve()}>{isapproveloading? <span><i className="fa fa-spinner fa-spin"></i> Approving</span> : <div className="btn_style"><img src={like}/> Approve</div>}</button>
    );
    }
  }


  const increaseStaking = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(
      stakingContractJson.contract,
      stakingContractJson.abi,
      signer
    );
    let period = 0;
    setIsStakingLoading(true);

    if (dropdownValue === 0){
      period=30;
    } else if (dropdownValue === 1){
      period=90;
    } else if (dropdownValue === 2){
      period=180;
    } else if (dropdownValue === 3){
      period=365;
    } else if (dropdownValue === 4){
      period=1095;
    } else if (dropdownValue === 5){
      period=1825;
    }
    
    try {
      await stakingContract.STAKE(address,ethers.utils.parseUnits(amnt.toString(), 18),period,dropdownOptionValue);
      toast.success("Staking Success!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });
        setIsAcitve(false);
        setStakedMCRT(parseInt(stakedMCRT)+parseInt(amnt));
        setStatus(true);
    } catch (error) 
    {
      toast.error(error["data"]["message"].split(":")[2], {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });
    }
    setTimeout(() => setIsStakingLoading(false), 4000);
    
  }

  const isnotapproved = () =>{
    toast.error("You are not approved, Please approve first!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "dark",
      transition: Flip,
      });
  } 

  const renderStake = () => {
    if(approved){
      return(
        <button onClick={()=>increaseStaking()}>{isstakingloading? <span><i className="fa fa-spinner fa-spin"></i> Loading</span> : "Increase Stake"}</button>
      );
      } else {
        return(
          <button onClick={() =>isnotapproved()}> <div className="btn_style"><img src={graph}/> Increase Stake</div></button>
      );
    }
  }

  const withdraw = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(
      stakingContractJson.contract,
      stakingContractJson.abi,
      signer
    );
    let period = 0;
    setWithdrawLoading(true);
    if (dropdownValue === 0){
      period=30;
    } else if (dropdownValue === 1){
      period=90;
    } else if (dropdownValue === 2){
      period=180;
    } else if (dropdownValue === 3){
      period=365;
    } else if (dropdownValue === 4){
      period=1095;
    } else if (dropdownValue === 5){
      period=1825;
    }
    try {
      await stakingContract.WithdrawForStakingPerPeriod(period,dropdownOptionValue);
      toast.success("Withdraw Success!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });   
        setIsAcitve(false);
        getStakedMCRT(period, dropdownOptionValue);
    } catch (error) {
      toast.error(error["data"]["message"].split(":")[2], {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        }); 
    }
    setTimeout (()=>setWithdrawLoading(false),4000);
  }

  const renderUnStake = () => {
    if(approved){
      return(
        <button onClick={()=>withdraw()}>{iswithdrawloading? <span><i className="fa fa-spinner fa-spin"></i> Loading</span> : "Withdraw staked tokens"}</button>
      );
      } else {
        return(
          <button disabled><div className="btn_style"><img src={withdrawClaim}/> Withdraw staked tokens</div></button>
      );
    }
  }

  const claimrwrd = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(
      stakingContractJson.contract,
      stakingContractJson.abi,
      signer
    );
    let period = 0;
    if (dropdownValue === 0){
      period=30;
    } else if (dropdownValue === 1){
      period=90;
    } else if (dropdownValue === 2){
      period=180;
    } else if (dropdownValue === 3){
      period=365;
    } else if (dropdownValue === 4){
      period=1095;
    } else if (dropdownValue === 5){
      period=1825;
    }
    
    setIsClaimLoading(true);
    
    try {
      await stakingContract.ClaimRewardPerperiod(dropdownOptionValue,period);

      toast.success("Claim Success!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
      });    
      setIsAcitve(false);
      getStakedMCRT(period, dropdownOptionValue);
    } catch (error) {
      toast.error(error["data"]["message"].split(":")[2], {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
        });
    }
    setTimeout(()=> setIsClaimLoading(false),4000);
  }

  const renderClaim = () => {
    if(approved){
      return(
          <button onClick={()=>claimrwrd()}>{isclaimloading? <span><i className="fa fa-spinner fa-spin"></i> Loading</span> : "Claim reward token"}</button>
      );
      } else {
        return(
          <button disabled><div className="btn_style"><img src={reward}/> Claim reward token</div></button>
      );
    }
  }


  useEffect(() => {
    const fetchContractdata = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const stakingContract = new ethers.Contract(
        stakingContractJson.contract,
        stakingContractJson.abi,
        signer
      );

      const point = await stakingContract.getPointPrice();
      setPointPrice(point[0].toNumber());
      setPointDecimals(point[1]);

      const mcrt = await stakingContract.getMCRTPrice();
      setMCRTPrice(mcrt[0].toNumber());
      setMCRTDecimals(mcrt[1])

      const tokenContract = new ethers.Contract(
        tokenContractJson.contract,
        tokenContractJson.abi,
        signer
      );
      const amount = await tokenContract.allowance(walletAddress.walletAddress,stakingContractJson.contract);
      if (amount>0){
        setApproved(true);
      }

      getStakedMCRT(30,0);
      getStakedMCRT(30,1);

      getStakedMCRT(90,0);
      getStakedMCRT(90,1);

      getStakedMCRT(180,0);
      getStakedMCRT(180,1);

      getStakedMCRT(365,0);
      getStakedMCRT(365,1);

      getStakedMCRT(1095,0);
      getStakedMCRT(1095,1);

      getStakedMCRT(1825,0);
      getStakedMCRT(1825,1);
      calculateEarned();

    };
    setWalletAddress(walletAddress.walletAddress);
    if(walletAddress.walletAddress){
      fetchContractdata();
    }
  },[walletAddress.walletAddress]);

  useEffect(()=>{
    calculateEarned();

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        calculateEarned();
      }, 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[isActive,dropdownValue,dropdownOptionValue]);

 
  useEffect(() => {
    if(status){

      let period = 0;
      if (dropdownValue === 0){
        period=30;
      } else if (dropdownValue === 1){
        period=90;
      } else if (dropdownValue === 2){
        period=180;
      } else if (dropdownValue === 3){
        period=365;
      } else if (dropdownValue === 4){
        period=1095;
      } else if (dropdownValue === 5){
        period=1825;
      }
      setStakedMCRT(parseInt(amnt).toFixed(4));
      setTimeout(()=>getStakedMCRT(period, dropdownOptionValue),30000);
      setStatus(false);
    }
  },[status])

  const dropdownList = [
    "Stake (lock) for 30 days",
    "Stake (lock) for 90 days",
    "Stake (lock) for 180 days",
    "Stake (lock) for 1 year",
    "Stake (lock) for 3 years",
    "Stake (lock) for 5 years",
  ];

  const dropdownListForOption = [
    "APY Reward method",
    "NFT Reward method",
  ];

  return (
    <div className="vstaking">
      <Container>
        <Row>
        <h1>MCRT Staking </h1>
          <Col sm={6}>
            <div className="vstaking__status-wrapper">
              <div className="vstaking__status">
                <div className="vstaking__status-item">
                  <img src={logo} alt="" />
                  <span>{stakedMCRT}</span>
                </div>
                <p>Staked MCRT</p>
              </div>

              <div className="vstaking__status">
                <img src={pic}/>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <div className="vstaking__status-wrapper">
              <div className="vstaking__status">
                <div className="vstaking__status-item">
                  <img src={logo} alt="" />
                  <span>{stakedMCRT}</span>
                </div>
                <p>Earned MCRT</p>
              </div>

              <div className="vstaking__status">
                <img src={pic}/>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      

      <Container className="vstaking__stake">
        
        <Row className="vstaking_margin">
          <Col sm={6} className="vstaking__stake__action">
          <h4>Staking Method</h4>
            <div style={{ position: "relative" }}>
              <div
                className={`vstaking__stake__action-select ${
                  visibleOptionDropdown ? "active" : ""
                }`}
                onClick={() => setVisibleOptionDropdown(!visibleOptionDropdown)}
              >
                <span>{dropdownListForOption[dropdownOptionValue]}</span>
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                  className="css-8mmkcg"
                  fill="#fff"
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </div>
              {visibleOptionDropdown && (
                  <ul className="vstaking__stake__action-selectoption">
                  {dropdownListForOption.map((it, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setDropdownOptionValue(idx);
                          setVisibleOptionDropdown(false);
                        }}
                      >
                        {it}
                      </li>
                    );
                  })}
                  </ul>
              )}
            </div><p></p>
            <h4>Stacking Period</h4>
            <input
              type="number"
              className="vstaking__stake__action-input"
              value={amnt}
              onInput={e=>setAmntInput(e.target.value)}
              min={0}
            />  

            <div style={{ position: "relative" }}>
            <h4>Token Amount</h4>
              <div
                className={`vstaking__stake__action-select ${
                  visibleDropdown ? "active" : ""
                }`}
                onClick={() => setVisibleDropdown(!visibleDropdown)}
              >
                <span>{dropdownList[dropdownValue]}</span>
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                  className="css-8mmkcg"
                  fill="#fff"
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </div>
              {visibleDropdown && (
                <ul className="vstaking__stake__action-option">
                  {dropdownList.map((it, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setDropdownValue(idx);
                          setVisibleDropdown(false);
                        }}
                      >
                        {it}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>




            <p className="vstaking__stake__action__hint-till">
              stake until 2022-4-6 01:00
            </p>
            <p className="vstaking__stake__action__hint-warn">
              Early unstake penalty is a max of 75% that then drops linearly
              each day until the stake unlock date.
            </p>
            <p className="vstaking__stake__action__hint-strong">
              If you Stake for the first time the first transaction is only to
              approve your VPAD after that you can start staking
            </p>
            {renderApprove()}
            {renderStake()}
            {renderClaim()}
            {renderUnStake()}
          </Col>

          <Col sm={6} className="vstaking__stake__info">
            <h4>Bonus Token</h4>
            <table>
              <tr>
                <th>Duartion</th>
                <th>APY</th>
                <th>NFT Reward</th>
              </tr>
              <tr>
                <td>30 days</td>
                <td>25% bonus</td>
                <td>None</td>
              </tr>
              <tr>
                <td>90 days</td>
                <td>50% bonus</td>
                <td>None</td>
              </tr>
              <tr>
                <td>180 days</td>
                <td>75% bonus</td>
                <td>Item</td>
              </tr>
              <tr>
                <td>1 year</td>
                <td>100% bonus</td>
                <td>Character</td>
              </tr>
              <tr>
                <td>3 years</td>
                <td>150% bonus</td>
                <td>Land</td>
              </tr>
              <tr>
                <td>5 years</td>
                <td>200% bonus</td>
                <td>2 * Land</td>
              </tr>
            </table>
          </Col>
        </Row>
      </Container>

      <Container className="vstaking__help">
        <span>
          - Stake as many times as you like <br />
          - Staked tokens count towards VLaunch lottery <br />
          - Unstake penalty only applies to staked amount, not APY rewards
          <br />- You can stake or withdraw rewards at any time
        </span>
      </Container>
    </div>
  );
};

export default VStaking;
