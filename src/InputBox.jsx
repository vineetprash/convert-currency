import { useState } from "react"



function OptionElement (value, index, currency, description) {
    
    return (
        <option key = {index} value = {value} selected = {currency == value} className="flex ">
            {value} {':'} {description.trimEnd()} 
        </option>
    )
}
function InputBox({
    label,
    isDisabled,
    currency,
    defaultValue = '',
    setCurrency,
    optionsList = [],
    optionsFullNames = {},
    valueState = null,
    setValueState = null,
    className = "",
}) {


    return (
        <div className={`bg-slate-950 p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label className="text-slate-300 mb-2 inline-block">
                    {label}
                </label>
                <input
                    color="black"
                    disabled = {isDisabled}
                    className="outline-none w-full bg-transparent py-1.5 text-slate-300 border-slate-800 focus:border-violet-950"
                    type="number"
                    placeholder="Amount"
                    value={(valueState==0) ? '' : valueState}
                    onChange={(e) => (setValueState(e.target.value))}
                    
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-slate-300 mb-2 w-full">Currency Type</p>
                <select
                    className="flex flex-wrap text-wrap  w-24 rounded-lg px-1 py-1 text-slate-300 bg-slate-800 cursor-pointer outline-none"
                    onChange={(e) => {setCurrency(e.target.value); console.log(e.target.value)}}
                    select = {currency}

                
                >
                    {/* {
                        (Array.isArray(optionsList) && optionsList !== null) ? optionsList?.map((value, index)=>{
                            (
                                OptionElement(value, index)
                            )
                        }) : (
                            <option>
                                loading...
                            </option>
                        )
                    }    */}
                    
                    {optionsList && optionsList.map((value, index) => (
                        OptionElement(value, index, currency, optionsFullNames[value]) 
                    ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
