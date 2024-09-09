import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);
  const handleContactSearch = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchBoxContainer}>
      <h2>Find contacts by name</h2>
      <input
        className={css.searchInput}
        type="text"
        name="name"
        value={filterValue}
        onChange={handleContactSearch}
      ></input>
    </div>
  );
};

export default SearchBox;
