import { useState, useRef } from "react";
import {
  Button,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import TitleForm from "./TitleForm";
import AuthFormWrapper from "../../UI/AuthFormWrapper";
import classes from "../AuthForm.module.css";

const BirthForm = ({ onNext }) => {
  const [genderSelected, setGenderSelected] = useState("");
  const [dateHasError, setDateHasError] = useState(false);
  const [genderHasError, setGenderHasError] = useState(false);
  const dateRef = useRef();
  const genderRef = useRef();

  const birthSubmitHandler = () => {
    const date = dateRef.current.value;
    const gender = genderRef.current.value;
    let hasValidationError = false;

    setGenderHasError(false);
    setDateHasError(false);

    if (!date) {
      hasValidationError = true;
      setDateHasError(true);
    }
    if (!gender) {
      hasValidationError = true;
      setGenderHasError(true);
    }

    onNext({ date, gender }, hasValidationError);
  };

  const handleGenderChange = (event) => {
    setGenderSelected(event.target.value || "");
  };

  return (
    <AuthFormWrapper isLogin={false}>
      <TitleForm
        title="Basic information"
        description="Complete with your birth date and gender"
      />
      <div className={classes["auth__birth-grid"]}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
          <DatePicker
            error
            inputRef={dateRef}
            disableFuture
            label={"MM/DD/YYYY"}
            className="Mui-error"
          />
        </LocalizationProvider>
        <FormControl
          error={genderHasError}
          className={classes["auth__birth-gender"]}
          fullWidth
        >
          <InputLabel id="genderTitle">Gender</InputLabel>
          <Select
            native
            inputRef={genderRef}
            labelId="genderTitle"
            id="gender"
            label="Gender"
            value={genderSelected}
            onChange={handleGenderChange}
          >
            <option aria-label="None" value="" />
            <option value={"woman"}>Woman</option>
            <option value={"man"}>Man</option>
            <option value={"na"}>I prefer not to answer</option>
          </Select>
          <FormHelperText>
            {genderHasError ? "Select gender" : " "}
          </FormHelperText>
        </FormControl>
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Button onClick={birthSubmitHandler} variant="contained">
          Continue
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default BirthForm;
