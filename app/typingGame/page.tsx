"use client"
import { faker } from '@faker-js/faker'
import { Button } from 'antd';
import { useRef } from 'react';
import { motion } from 'framer-motion'
import { span } from 'framer-motion/client';
import { useEngin } from './hooks';
export default function page() {
    const {state, words, updatedWords,timeLeft, startTimeLeft,resetTimeLeft,typed,clearTyped,restart,totalTyped,errors,goBack} = useEngin();
    
    return (
        <div className="bg-slate-800 h-screen flex items-center justify-center flex-col font-mono text-4xl text-white">
            <BackButton goBack={goBack}></BackButton>
            <CounterTimer time={timeLeft}></CounterTimer>
            <div className="relative w-6/12 h-20">
                <GenerRateWords words={words} className="absolute  w-full text-left break-all"></GenerRateWords>
                <UserTypings userInput={typed} words={words} className="absolute w-full text-left break-all"></UserTypings>
            </div>
            <ResterButton restart={restart}></ResterButton>
            {
                timeLeft === 0 && <Result 
                className="mt-10"
                errors={errors}
                accuracypercentage={10}
                total={totalTyped.current}></Result>
            }
        </div>
    )
}
interface wordsProps {
    words: string
    className?: string
}
interface timeProps {
    time: number
}
interface restartProps {
    restart: () => void
}
const GenerRateWords = ({ words, className }: wordsProps) => {
    return (
        <div className={`text-slate-500 ${className}`}>
            {words}
        </div>
    )
}
const CounterTimer = ({ time }: timeProps) => {
    return (
        <h2 className='mb-10'>
            time:{time}
        </h2>
    )
}
const ResterButton = ({ restart: restartFun }: restartProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleOnclick = () => {
        buttonRef.current?.blur() 
        restartFun();
    }
    return (
        <Button ref={buttonRef} className='mt-10' onClick={ handleOnclick}>重置</Button>
    )
}
interface ResultProps {
    errors: number
    accuracypercentage: number
    total: any,
    className?: string
}
const Result = ({ errors, accuracypercentage, total, className }: ResultProps) => {
    const inital = { opacity: 0 }
    const animate = { opacity: 1 }
    const duration = { duration: 0.3 }

    return (
        <motion.ul

            className={`flex flex-col text-primary-400 space-y-3 ${className}`}>
            <motion.li
                initial={inital}
                animate={animate}
                transition={{ ...duration, delay: 0 }}>Results</motion.li>
            <motion.li
                initial={inital}
                animate={animate}
                transition={{ ...duration, delay: 0.5 }}>Accuracy:{accuracypercentage}%</motion.li>
            <motion.li
                initial={inital}
                animate={animate}
                transition={{ ...duration, delay: 1 }}
                className='text-red-500'>Errors:{errors}</motion.li>
            <motion.li
                initial={inital}
                animate={animate}
                transition={{ ...duration, delay: 1.5 }}
            >Typed:{total}</motion.li>
        </motion.ul>
    )
}
interface UserTypings { userInput: string, className?: string ,words: string};
const UserTypings = ({ userInput, className ,words}: UserTypings) => {
    const typedWords = userInput.split('');
    return (
        <div className={className}>
            {typedWords.map((char, index) => {
                if(char === words[index]){
                    return <span key={char + index} className='text-primary-400'>
                            {char}
                        </span>
                }else{
                    return <span key={char + index} className='text-red-500'>
                    {words[index]}
                        </span>
                }
                
            })
            
            }
            <Caret/>
        </div>
    )
}
const Caret = ()=>{
    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{repeat:Infinity,duration:0.8,ease:'easeInOut'}}
        className="inline-block w-1 h-7 bg-amber-400">
        </motion.div>
    )
}
interface backProps{
    goBack: () => void
}
const BackButton = ({goBack}:backProps)=>{
    return (
        <Button onClick={goBack}>back</Button>
    )
}