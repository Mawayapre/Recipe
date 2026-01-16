'use client'

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import styles from '../styles/styles.module.css'
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Page = () => {

    const router = useRouter();

    const [mealss, setMealss] = useState([])
    const [input, setInput] = useState('')
    const [page , setPage] = useState(0)
    const [search , setSearch] = useState(true)
    const [loading , setLoading] = useState(false)
    const [errorr , setErrorr] = useState(false)

    const itemsPerPage = 8;

    const meals = mealss.slice(page * itemsPerPage, (page + 1) * itemsPerPage); 

    const next = () => {
        if ((page + 1) * itemsPerPage >= mealss.length) {
            return alert('This is the last page');
        }
        setPage(prev => prev + 1);
    }

    const previous = () => {
        if (page === 0) return alert('This is the first page');
        setPage(prev => prev - 1);
    }


    useEffect(() => {
        const storedMeals = localStorage.getItem('meals')
        if(storedMeals) {
            setMealss(JSON.parse(storedMeals))
            setSearch(false)
        }
    }, [])

    const searchMeal = async () => {
        setLoading(true)
        setSearch(true)
        setErrorr(false)
        setMealss([])

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            const data = await response.json();
            
            if(data.meals) {
                localStorage.setItem('meals', JSON.stringify(data.meals))
            }

            if(!data.meals){
                setErrorr(true)
                setLoading(false)
                return;
            } else{
                setErrorr(false)
            }

            if(response.ok){
                setSearch(false)
            }

            setMealss(data.meals || [])
            
        } catch (error) {
            console.log('something went wrong')
        } finally{
            setInput('')
            setPage(0)
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>

            {/* header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    Discover the Perfect Recipe       
                </div>
                <div className={styles.searchBar}>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.input} type="text"
                        placeholder='Search recipes'
                    />
                    <button
                        onClick={searchMeal}
                        className={styles.searchButton}>
                        Search
                    </button>
                </div>
            </div>

            {/* recipes */}
            <div className={styles.recipesContainer}>
                <div className={styles.title}>
                    {search ? ' ' : 'Popular Recipes'}
                </div>

                {/* cards */}
                {errorr ? <div className={styles.errorr}>Recipe not found. Try something else!</div> : '' }

                {loading 
                    ? <div className={styles.loading}>Loading... </div> 
                    : <div className={styles.recipesCards}>
                        {meals.map((meal, index) => (
                            <Link href={`/recipe/${meal.idMeal}`}
                            key={index} className={styles.card}>
                                <div className={styles.image}>
                                    <Image
                                        src={meal.strMealThumb} 
                                        alt={meal.strMeal}
                                        width={400}
                                        height={300}
                                        loading="eager"
                                    />
                                </div>

                                <div className={styles.recipeInfo}>
                                    <div>
                                        <span className={styles.title}>
                                            {meal.strMeal}
                                        </span>
                                    </div>
                                    <div className={styles.learnMore}>
                                        <Link href={`/recipe/${meal.idMeal}`}>Learn more</Link>
                                        <Link className={styles.arrow} href ='/'>
                                        <Image
                                        src='/arrow-forward.svg'
                                        alt='arrow-back'
                                        width={400}
                                        height={300}
                                        />
                                    </Link>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>

            <div className={styles.navButtons}>
                {page > 0 && (
                    <button onClick={previous} className={styles.button}>Prev</button>
                )}
                {(page + 1) * itemsPerPage < mealss.length && (
                    <button onClick={next} className={styles.button}>Next</button>
                )}
            </div>        
        </div>
    )
}

export default Page
