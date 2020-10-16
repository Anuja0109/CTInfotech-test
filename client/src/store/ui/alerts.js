import { createAction, createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Actions
export const alertAdded = createAction("alertAdded");
export const alertRemoved = createAction("alertRemoved");


// Reducer
export default createReducer([], {
    [alertAdded.type]: (alerts, action) => {
        const id = uuidv4();
        alerts.push({
            id: id,
            message: action.payload.message,
            alertType: action.payload.alertType
        });
        // setTimeout(() => alertRemoved({id: id}), 3000);
    },
    [alertRemoved.type]: (alerts, action) => {
        alerts.filter(alert => alert.id !== action.payload.id);
    }
});