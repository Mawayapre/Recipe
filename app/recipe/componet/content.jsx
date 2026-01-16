'use client' 

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../../../styles/page.module.css'
import Link from 'next/link'

const Content = ({id}) => {
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await response.json()
                setRecipe(data.meals)
                console.log(data.meals)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [id])

    return (
        <>
            {recipe.map((meal, index) => (
                <div key={index} className={styles.container}>
                    <Link className={styles.arrow} href ='/'>
                        <Image
                        src='/arrow-back.svg'
                        alt='arrow-back'
                        width={400}
                        height={300}
                        />
                    </Link>
                    <div className={styles.name}>
                                {meal.strMeal}
                    </div>
                    <div className={styles.mealOverview}>
                        <div className={styles.image}>
                            <Image
                                src={meal.strMealThumb}
                                alt={meal.strCategory}
                                width={400}
                                height={300}
                                loading="eager"
                            />
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.ingredients}>

                                <div className={styles.title}>Ingredients</div>
                                <div className={styles.ingrVideo}>
                                <ul>
                                    {Object.keys(meal)
                                        .filter(key => key.startsWith("strIngredient") && meal[key])
                                        .map(key => {
                                            const number = key.replace("strIngredient", "") 
                                            const measure = meal[`strMeasure${number}`]
                                            return (
                                            <li key={key}>
                                                {measure} {meal[key]}
                                            </li>
                                            )
                                        })}
                                </ul>

                                <div className={styles.video}>
                                 <iframe

                                    className={styles.vid}
                                    src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                                    title={meal.strMeal}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    ></iframe>

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <div>
                            <div className={styles.title}>
                                Instructions
                            </div>
                            <p>  
                                {meal.strInstructions}
                            </p>
                        </div>
                        <div>
                            <div className={styles.title}></div>
                            <div></div>
                        </div>       
                    </div>
                    <div className={styles.signature}>
                                    Designed and developed by Mawaya
                    </div>
                </div>   
            ))}
        </>
    )
}

export default Content
