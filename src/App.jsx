import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import './index.css'

function App() {
    const PRECISION = 4
    let [exhangeRate, setExchangeRate] = useState(0)
    let [fromCurrency, setFromCurr] = useState('usd');
    let [toCurrency, setToCurr] = useState('inr');


    let [inputValue, setInput] = useState('');
    let [outputValue, setOutput] = useState('');

    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
    let currenciesUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`;
    let BackgroundImage = `https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`


    const [currenciesList, setCurrList] = useState([])

    useEffect(()=>{
        fetch(currenciesUrl).then((res) =>  res.json())
        .then(data => {
            setCurrList(data)
        })
        .catch(
            e => {
                console.log("Error caught gracefully: ", e);
            }
        )
    }, [])

    useEffect(fetchExchange, [fromCurrency, toCurrency, setFromCurr, setToCurr,swapHandler])
    useEffect(calculateExchange, [inputValue, setInput,swapHandler])

    function fetchExchange() {
        fetch(url).then((res) => res.json())
        .then(
            data => {
                setExchangeRate(data[fromCurrency][toCurrency])
                console.log(`Exchange rate = ${exhangeRate}`)
            }
        )
       
        .catch(e => console.log("Error caught gracefully: ", e))
    }


    function calculateExchange() {
        console.log(`Conveting ${fromCurrency} into ${toCurrency}: `, inputValue)

        let output = (inputValue * exhangeRate)
        console.log(`Temp output: `,outputValue)

        let netPrecision = Math.log10((output > 1) ? output : 1) + 1 + PRECISION
        console.log(`precision: `,netPrecision)
        output = output.toPrecision(netPrecision)
        setOutput(output)

        console.log(`Final output: `,outputValue)
    }

    function swapHandler() {
        let temp = fromCurrency
        setFromCurr(toCurrency)
        setToCurr(temp);
    }
    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-slate-950 rounded-lg p-5 backdrop-blur-sm bg-slate-500/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                isDisabled = {false}
                                default={'usd'}
                                valueState = {inputValue}
                                setValueState = {setInput}
                                optionsList = {Object.keys(currenciesList)}
                                optionsFullNames={currenciesList}
                                currency = {fromCurrency}
                                setCurrency = {setFromCurr}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-slate-950 rounded-md bg-violet-950 text-white px-2 py-0.5"
                                onClick={() => {swapHandler() ; fetchExchange(); calculateExchange()}}

                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                valueState = {outputValue}
                                default={'inr'}
                                isDisabled = {true}
                                optionsList = {Object.keys(currenciesList)}
                                optionsFullNames = {currenciesList}
                                currency = {toCurrency}
                                setCurrency = {setToCurr}
                            />
                        </div>
                        {/* <button type="submit" className="w-full bg-violet-950 text-white px-4 py-3 rounded-lg"
                            onClick={calculateExchange}>
                            Convert 
                        </button> */}
                    </form>
                </div>
            </div>
        </div>
    );

}

export default App;
