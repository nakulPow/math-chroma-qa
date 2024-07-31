import React, { useState, useEffect } from 'react';
import styles from './SwitchToggle.module.css';

function SwitchToggle({ initialState = false, onToggle }) {
  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    // Emit the initial state to the parent
    onToggle(isChecked);
  }, []);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default SwitchToggle;