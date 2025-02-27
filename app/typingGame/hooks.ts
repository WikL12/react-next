export type State = 'start' | 'run' | 'end';
import { useState, useRef, useEffect, useCallback } from "react";
import { faker } from '@faker-js/faker'
import { useRouter } from "next/navigation";
// 导出一个名为useEngin的函数
export const useEngin = () => {
    const route = useRouter();
    const goBack = ()=>{route.push('/')}
    // 使用useState钩子，初始化state为'start'
    const [state, setState] = useState<State>('start');
    //useWords
    const { words, updatedWords } = useWords(10);
    const [countDownSeconds,setCountDownSeconds] = useState<number>(15);
    const { timeLeft, startTimeLeft, resetTimeLeft } = useCountTimer(10);
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped, } = useTyping(state == 'end',countDownSeconds);
    
    const [errors,setErrors] = useState<number>(0);

    const isStarting = state === 'start' && cursor > 0
    const areWordsFinished = cursor == words.length;
    const restart = useCallback(() => {
        resetTimeLeft()
        resetTotalTyped()
        setState('start')
        updatedWords()
        clearTyped()
        setErrors(0)
    }, [clearTyped, resetTimeLeft, resetTotalTyped, updatedWords])
    useEffect(() => {
        if (isStarting && countDownSeconds > 0) {
            setState('run')
            startTimeLeft()
        }
    }, [isStarting, setCountDownSeconds, countDownSeconds])
    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(cursor, words.length))

        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached))
    }, [typed, words, cursor])
     const countErrors = (actual: string, expected: string) => {
        const expectedChars = expected.split("")
      
        return expectedChars.reduce((errors, expectedChar, i) => {
          const actualChar = actual[i]
          return errors + (actualChar === expectedChar ? 0 : 1)
        }, 0)
      }
      
       

    useEffect(() => {
        if (timeLeft === 0 && state == 'run') {
            setState('end')
            sumErrors()
            setCountDownSeconds(0)
        }
    }, [timeLeft, state, sumErrors])

    

    useEffect(() => {
        if (areWordsFinished) {
            updatedWords()
            clearTyped()
            sumErrors()
        }
    }, [clearTyped, updatedWords, sumErrors, areWordsFinished])



    return {
        state, words, updatedWords, timeLeft, startTimeLeft, resetTimeLeft, typed,clearTyped,restart,totalTyped,errors,goBack
    }
}


export const useWords = (count: number) => {
    const wordss = faker.word.words(count);
    const [words, setWord] = useState<string>(wordss);

    const updatedWords = useCallback(() => {
        setWord(faker.word.words(count));
    },[count])
    return { words, updatedWords }
}

export const useCountTimer = (initalTime: number) => {
    const [timeLeft, setTimeLeft] = useState<number>(initalTime);
    const intervalRef = useRef<any>(null);
    useEffect(()=>{
        setTimeLeft(initalTime);
    },[initalTime])
    const startTimeLeft = useCallback(
        () => {
            if(intervalRef.current){
                clearInterval(intervalRef.current)
            }
            intervalRef.current = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000)
        },[initalTime]
    )
    const resetTimeLeft = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        };
        setTimeLeft(initalTime);
    },[initalTime])
    useEffect(() => {
        if (!timeLeft && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }, [
        timeLeft,intervalRef
    ]);
    return {
        timeLeft, startTimeLeft, resetTimeLeft
    }
}


export const useTyping = (isFinsed:boolean,countDownSeconds: number) => {
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
        if (!countDownSeconds) return;
        if (e.key === 'Backspace') {
            setTyped((typed) => typed.slice(0, -1));
            setCursor((cursor) => cursor - 1);
            totalTyped.current -= 1;
        } else if (e.key.startsWith('Key') || e.key.startsWith('Digit') || e.key.startsWith('Tab') ) {
            return
        } else {
            setTyped((typed) => typed + e.key);
            setCursor((cursor) => cursor + 1);
            totalTyped.current += 1;

        }
    }, [countDownSeconds])

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