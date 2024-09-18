import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const value = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={handleChange} />
      </label>
    </div>
  );
};

export default SearchBox;
