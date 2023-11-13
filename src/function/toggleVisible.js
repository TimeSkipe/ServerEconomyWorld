import { PORT } from "../connect/connect";
import axios from "axios";
export const handleToggleVisible = async (countryCode) => {
    try {
      await axios.put(`${PORT}/api/indicators/${countryCode}/show`);
      // Опрацьовувати успішну відповідь сервера, якщо необхідно
      window.location.reload()
    } catch (error) {
      console.log('Error:', error);
      // Опрацьовувати помилку, якщо необхідно
    }
  };

 export const handleToggleHidden = async (countryCode) => {
    try {
      await axios.put(`${PORT}/api/indicators/${countryCode}/hide`);
      // Опрацьовувати успішну відповідь сервера, якщо необхідно
      window.location.reload()
    } catch (error) {
      console.log('Error:', error);
      // Опрацьовувати помилку, якщо необхідно
    }
  };
 
