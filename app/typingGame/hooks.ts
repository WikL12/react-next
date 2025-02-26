
"use client"
export type State = 'start' | 'run' | 'end';
import { useState, useRef, useEffect, useCallback } from "react";
import { faker } from '@faker-js/faker'
export const useEngin = () => {
    const [state, setState] = useState<State>('start');
    //useWords
    const { words, updatedWords } = useWords(10);
    const { timeLeft, startTimeLeft, resetTimeLeft } = useCountTimer(30);
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped, } = useTyping(state);
    // 当我们开始敲击时
    useEffect(() => {
        if(state === 'start'){
            setState('run');
            startTimeLeft();
            }
    },[state,startTimeLeft])

    const sumErrors = ()=>{
        const wordsAllTyped = words.substring(0,Math.min(words.length,totalTyped.current));
        const errors = countErrors(wordsAllTyped,typed);
    }
    const countErrors = (actrol:string,expected:string)=>{
        const expectWrod = expected.split('');
        expectWrod.reduce((errors,expectedChar,index)=>{
            if(actrol[index] !== expectedChar){
                return errors + 1;
            }
            return errors;
        },0)
    }
    // 当计时结束时
    useEffect(() => {
        if(timeLeft <= 0 && state === 'run'){
            setState('end')
            // 计算错误率
            sumErrors();
        }
    },[timeLeft,state])


    // 当一组单词敲完，要产生一组新的单词
    useEffect(() => {
        if(cursor == words.length){
            updatedWords();
            clearTyped();
        }
    },[])
    return {
        state, words, updatedWords, timeLeft, startTimeLeft, resetTimeLeft, typed
    }
}


export const useWords = (count: number) => {
    const wordss = faker.word.words(count);
    const [words, setWord] = useState<string>(wordss);
    const updatedWords = () => {
        setWord(faker.word.words(count));
    }
    return { words, updatedWords }
}

export const useCountTimer = (initalTime: number) => {
    const [timeLeft, setTimeLeft] = useState<number>(initalTime);
    let intervalRef:any  = null

    const startTimeLeft = useCallback(
        () => {
            if(intervalRef){
                clearInterval(intervalRef)
            }
            intervalRef = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000)
            console.log(intervalRef)
        },[initalTime]
    )
    const resetTimeLeft = () => {
        console.log(intervalRef);
        if (intervalRef) {
            clearInterval(intervalRef)
        } 
    }
    useEffect(() => {
        if (!timeLeft) {
            clearInterval(intervalRef)
            alert(1)
        }

        return ()=>{
            if (!timeLeft) {
                clearInterval(intervalRef)
            }
        }
    }, [
        timeLeft,intervalRef
    ]);
    return {
        timeLeft, startTimeLeft, resetTimeLeft
    }
}


export const useTyping = (state: string) => {
    const [typed, setTyped] = useState<string>('');
    const [cursor, setCursor] = useState<number>(0);
    const totalTyped = useRef<number>(0);
    const clearTyped = () => {
        setTyped('');
        setCursor(0);
    }
    const resetTotalTyped = () => {
        totalTyped.current = 0;
    }
    const keydownHandler = useCallback((e: KeyboardEvent) => {
        console.log('keydown', e.key, e.code)
        if (state == 'end') return;
        console.log(e.key)
        if (e.key === 'Backspace') {
            setTyped((typed) => typed.slice(0, -1));
            setCursor((cursor) => cursor - 1);
            totalTyped.current -= 1;
        } else if (e.key.startsWith('Key') || e.key.startsWith('Digit') || e.key.startsWith('Tab') || e.code == 'Space') {
            return
        } else {
            setTyped((typed) => typed + e.key);
            setCursor((cursor) => cursor + 1);
            totalTyped.current += 1;

        }
    }, [])
    useEffect(() => {
        window.addEventListener('keydown', keydownHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [keydownHandler])

    return {
        typed, cursor, clearTyped, resetTotalTyped, totalTyped,
    }
}