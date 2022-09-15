import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [availableMealsArray, setAvailableMealsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-learning-a0dcf-default-rtdb.firebaseio.com/meals.json "
      );

      if (!response.ok) {
        throw new Error("Something went wrong in the kitchen !!");
      }

      const responseData = await response.json();
      const foundMeals = [];
      for (const key in responseData) {
        foundMeals.push({ id: key, ...responseData[key] });
      }
      setAvailableMealsArray(foundMeals);
      setIsLoading((prevIsLoading) => !prevIsLoading);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const mealList = availableMealsArray.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading ? (
            <p className={classes.loadingState}>Loading...</p>
          ) : httpError ? (
            <p className={classes.loadingState}>{httpError}</p>
          ) : (
            mealList
          )}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
