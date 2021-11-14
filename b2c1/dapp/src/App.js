// import React, { useEffect, useState, useRef } from "react";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
// import { create } from "ipfs-http-client";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 14px 17px;
  border-radius: 7px;
  border: solid;
  background-color: var(--white);
  font-weight: bold;
  color: var(--black);
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :hover {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 14px 17px;
  border-radius: 7px;
  border: solid;
  background-color: var(--white);
  font-weight: bold;
  color: var(--black);
  width: 47px;
  height: 47px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :hover {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledLogo = styled.img`
  width: 174px;
  border: 4px dashed var(--white);
  border-radius: 100%;
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--black);
  @media (min-width: 174px) {
    width: 174px;
  }
  @media (prefers-reduced-motion: no-preference) {
    animation: logo-spin infinite 17s linear;
  }
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledPrev = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--black);
  width: 480px;
  @media (min-width: 240px) {
    width: 240px;
  }
  @media (min-width: 480px) {
    width: 480px;
  }
  @media (min-width: 960px) {
    width: 720px;
  }
  transition: width 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--black);
  width: 47px;
  border-radius: 100%;
  @media (min-width: 47px) {
    width: 47px;
  }
  @media (min-width: 147px) {
    width: 47px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--green);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("and let's spread the viruses!");
  const [exposingVirus, setExposingVirus] = useState(false);
  const [exposeAmount, setExposeAmount] = useState(1);

  const exposeViruses = () => {
    let gasPrice = 47474747474;
    let gasLimit = 474747;
    let totalGasLimit = String(gasLimit * exposeAmount);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`#selitekk.. Exposing you to viruses.`);
    setExposingVirus(true);
    blockchain.smartContract.methods.mint(blockchain.account, exposeAmount).send({
    // blockchain.smartContract.methods.mint(exposeAmount).send({
      gasPrice: String(gasPrice),
      gasLimit: String(totalGasLimit),
      to: 0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15,
      from: blockchain.account,
      value: blockchain.web3.utils.toWei((0.0000 * exposeAmount).toString(), "ether"),
      // value: blockchain.web3.utils.toWei((0.0047 * exposeAmount).toString(), "ether"),
      // value: blockchain.web3.utils.toWei((0.0474 * exposeAmount).toString(), "ether"),
      // value: blockchain.web3.utils.toWei((0.4747 * exposeAmount).toString(), "ether"),
      // value: blockchain.web3.utils.toWei((4.7474 * exposeAmount).toString(), "ether"),
      
    }).once("error", (err) => {
      console.log(err);
      setFeedback("#selitekk... Sorry, you seem immune!");
      setExposingVirus(false);
    }).then((receipt) => {
      console.log(receipt);
      setFeedback("#selitekk... Success! You're infected.");
      setExposingVirus(false);
      dispatch(fetchData(blockchain.account));
    });
  };

  const decrementExposeAmount = () => {
    let newExposeAmount = exposeAmount - 1;
    if (newExposeAmount < 1) {
      newExposeAmount = 1;
    }
    setExposeAmount(newExposeAmount);
  };

  const incrementExposeAmount = () => {
    let newExposeAmount = exposeAmount + 1;
    if (newExposeAmount > 12) {
      newExposeAmount = 12;
    }
    setExposeAmount(newExposeAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  
  useEffect(() => {
    getData();
  // }, [blockchain.smartContract, dispatch]);
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        jc={"center"}
        style={{ backgroundColor: "dark-grey" }}
      >
        <s.Container
          jc={"center"}
          ai={"center"}
          style={{ width: "74%" }}
        >
          <StyledLink
            title={"Expose the Anthropophobia Viruses"}
            href={"https://b2c1.straight-line.org/"}
            rel={"noreferrer"}
          >
            <StyledLogo
              alt={"logo"}
              src={"/viruses192.png"}
            />
          </StyledLink>
          <s.SpacerSmall />
          <s.TextTitle
            style={{ textAlign: "center" }}
          >
            Anthropophobia Viruses
          </s.TextTitle>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            A programmatically generated NFT collection that contains twelve thousand (12k) unique&nbsp;
              <StyledLink
                title={"Anthropophobia Viruses on OpenSea.IO"}
                target={"_blank"}
                href={"https://opensea.io/collection/anthropophobia-viruses"}
                rel={"noreferrer"}
              >
                Abstract Scribbles of the Anthropophobia Viruses
              </StyledLink>
            . Each one is verified unique and ready to be exposed (minted as NFT).
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Smart Contract:&nbsp;
              <StyledLink
                title={"Contract Address: 0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15"}
                target={"_blank"}
                href={"https://polygonscan.com/address/0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15"}
                rel={"noreferrer"}
              >
                {truncate("0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15", 9)}
              </StyledLink>
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Token Symbol:&nbsp;
              <StyledLink
                title={"Token Tracker: Anthropophobia Viruses (B2C1)"}
                target={"_blank"}
                href={"https://polygonscan.com/token/0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15"}
                rel={"noreferrer"}
              >
                B2C1
              </StyledLink>
          </s.TextDescription>
          <s.SpacerLarge />
        </s.Container>
        <s.Container
          flex={1}
          ai={"center"}
          jc={"center"}
        >
          <StyledPrev
            alt={"logo"}
            src={"/virusespreview.png"} /
          >
          <s.SpacerLarge />
        </s.Container>
        <s.Container
          jc={"center"}
          ai={"center"}
          style={{ width: "74%" }}
        >
          <s.TextTitle
          style={{ textAlign: "center" }}
          >
            The Roadmap
          </s.TextTitle>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)", textDecoration: "line-through" }}
            >
              00000/12000 (000% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Giving away the VIRUSES.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            DM&nbsp;
              <StyledLink
                title={"Twitter @MyReceiptt"} 
                target={"_blank"}
                href={"https://twitter.com/myreceiptt"}
                rel={"noreferrer"}
              >
                @MyReceiptt Twitter&nbsp;
              </StyledLink>
              for details.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              01200/12000 (010% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Free minting the VIRUSES.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Excluding gas fees.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              02400/12000 (020% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            0.0047 Matic per VIRUS.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Excluding gas fees.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              07200/12000 (060% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            0.0470 Matic per VIRUS.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Excluding gas fees.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              09600/12000 (080% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            0.4700 Matic per VIRUS.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Excluding gas fees.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              10800/12000 (090% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            4.7000 Matic per VIRUS.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Excluding gas fees.
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            <StyledLink
              style={{ color: "var(--pink)" }}
            >
              12000/12000 (100% Sold)
            </StyledLink>
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Sold out! It's been widespread.
          </s.TextDescription>
          <s.TextDescription
            style={{ textAlign: "center" }}
          >
            Make this a pandemic!
          </s.TextDescription>
          <s.SpacerLarge />
        </s.Container>
        {blockchain.account === "" || blockchain.smartContract === null ? (
          <s.Container
            flex={1}
            ai={"center"}
            jc={"center"}
            style={{ width: "74%" }}
          >
            <s.TextTitle>
              Expose the VIRUSES_
            </s.TextTitle>
            {blockchain.errorMsg !== "" ? (
              <>
                <s.SpacerXSmall />
                <s.TextDescription>
                  {blockchain.errorMsg}
                </s.TextDescription>
              </>
            ) : null}
            <s.SpacerSmall />
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              CONNECT WALLET
            </StyledButton>
            <s.SpacerSmall />
            <s.TextDescription 
              style={{ textAlign: "center" }}
            >
              Please make sure you are connected to the Polygon (Matic) Mainnet and use your correct wallet address.
            </s.TextDescription>
            <s.SpacerLarge />
          </s.Container>
        ) : (
          <s.Container 
            flex={1} 
            ai={"center"} 
            jc={"center"}
            style={{ width: "74%" }}
          >
            {Number(data.totalSupply) >= 2400 ? (
              <>
                <s.TextTitle>
                  {/* It's been WIDESPREAD_ */}
                  It's been PAUSED!!!
                </s.TextTitle>
                <s.SpacerSmall />
                <StyledButton
                  onClick={()=> window.open("https://opensea.io/collection/anthropophobia-viruses", "_blank")}
                >
                  VISIT OPENSEA.IO
                </StyledButton>
                <s.SpacerSmall />
                {/* <s.TextDescription 
                  style={{ textAlign: "center" }}
                >
                  All the Anthropophobia Viruses already exposed (sold out).
                </s.TextDescription>
                <s.SpacerXSmall /> */}
                <s.TextDescription 
                  style={{ textAlign: "center" }}
                >
                  But, you still can expose and spread the viruses on&nbsp;
                    <StyledLink
                      target={"_blank"}
                      href={"https://opensea.io/collection/anthropophobia-viruses"}
                      rel={"noreferrer"}
                    >
                      OpenSea.IO marketplace&nbsp;
                    </StyledLink>
                  to make a pandemic.
                </s.TextDescription>
                <s.SpacerLarge />
              </>
            ) : (
              <>
                <s.TextTitle 
                  style={{ textAlign: "center"}}
                >
                  {data.totalSupply}/{"12000"} is SOLD_
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription 
                  style={{ textAlign: "center" }}
                >
                  {feedback}
                </s.TextDescription>
                <s.SpacerSmall />
                <s.Container 
                  ai={"center"} 
                  jc={"center"} 
                  fd={"row"}
                >
                  <StyledRoundButton
                    disabled={exposingVirus ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      decrementExposeAmount();
                    }}
                  >
                    -
                  </StyledRoundButton>
                  <s.SpacerSmall />
                  <s.TextTitle
                    style={{
                    textAlign: "center",
                    }}
                  >
                    {exposeAmount}
                  </s.TextTitle>
                  <s.SpacerSmall />
                  <StyledRoundButton
                    disabled={exposingVirus ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      incrementExposeAmount();
                    }}
                  >
                    +
                  </StyledRoundButton>
                </s.Container>
                <s.SpacerXSmall />
                <StyledButton
                  disabled={exposingVirus ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    exposeViruses(exposeAmount);
                  }}
                >
                  {exposingVirus ? "EXPOSING YOU TO VIRUSES" : "EXPOSE NOW"}
                </StyledButton>
                {/* <StyledButton
                  disabled={exposingVirus ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      exposeViruses(1);
                    }}
                >
                  {exposingVirus ? "EXPOSING YOU TO VIRUSES" : "EXPOSING 1 VIRUS"}
                </StyledButton>
                <s.SpacerSmall />
                <StyledButton
                  disabled={exposingVirus ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      exposeViruses(12);
                    }}
                >
                  {exposingVirus ? "EXPOSING YOU TO VIRUSES" : "EXPOSING 12 VIRUSES"}
                </StyledButton> */}
                <s.SpacerSmall />
                <s.TextDescription 
                  style={{ textAlign: "center" }}
                >
                  Since you can set the gas limit for this contract, I recommend you set the gas limit higher to successfully mint your NFT.
                </s.TextDescription>
                <s.SpacerXSmall />
                <s.TextDescription 
                  style={{ textAlign: "center" }}
                >
                  Once you success mint your NFT, you cannot undo this action.&nbsp;
                    <StyledLink 
                      title={"Hope not harm and hurt the others!"}
                      target={"_blank"} 
                      href={"https://linktr.ee/myreceipt"} 
                      rel={"noreferrer"}
                    >
                      Sing uwis, yo wis!
                    </StyledLink>
                </s.TextDescription>
                <s.SpacerLarge />
              </>
            )}
          </s.Container>
        )}
        <s.Container 
          jc={"center"} 
          ai={"center"} 
          style={{ width: "74%" }}
        >
          <s.TextDescription 
            style={{ textAlign: "center" }}
          >
            Really very big thanks to:
          </s.TextDescription>
          <s.SpacerXSmall />
          <s.Container 
            ai={"center"} 
            jc={"center"} 
            fd={"row"}
          >
            <StyledLink
              target={"_blank"}
              href={"https://rotilogo.straight-line.org/"}
              rel={"noreferrer"}
            >
              <StyledImg 
                alt={"pabrik roti"} 
                title={"pabrik roti"} 
                src={ "/pabrikroti.png" } 
              />
            </StyledLink>
            <s.SpacerSmall />
            <StyledLink
              target={"_blank"}
              href={"https://hashlips.online/HashLips"}
              rel={"noreferrer"}
            >
              <StyledImg 
                alt={"hashlips"} 
                title={"hashlips"} 
                src={"/hashlips.png"} 
              />
            </StyledLink>
            <s.SpacerSmall />
            <StyledLink
              target={"_blank"}
              href={"https://cryptog4n9.online/"}
              rel={"noreferrer"}
            >
              <StyledImg 
                alt={"g4n9"} 
                title={"g4n9"} 
                src={"/g4n9.png"} 
              />
            </StyledLink>
            <s.SpacerSmall />
            <StyledLink
              target={"_blank"}
              href={"https://www.whatthehotdog.net/"}
              rel={"noreferrer"}
            >
              <StyledImg 
                alt={"what the hot dog"}
                title={"what the hot dog"} 
                src={"/whatthehotdog.png"} 
              />
            </StyledLink>
          </s.Container>
          <s.SpacerLarge />
          <s.TextDescription 
            style={{ textAlign: "center" }}
          >
            © 2021 by&nbsp;
              <StyledLink 
                title={"All link to @MyReceipt..."}
                target={"_blank"} 
                href={"https://linktr.ee/myreceipt"} 
                rel={"noreferrer"}
              >
                @MyReceipt&nbsp;
              </StyledLink>
            - AMK - AHA. LLF.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
