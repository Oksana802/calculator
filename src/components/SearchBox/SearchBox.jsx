import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";

import { changeFilter } from "../../redux/filters/slice";
import { selectQueryFilter } from "../../redux/filters/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectQueryFilter);
  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div>
      <label className={s.filter}>
        <span className={s.span}>Find contacts by name/number</span>
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default SearchBox;
