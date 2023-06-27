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
    console.log("Date", date);

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
        title="Información básica"
        description="Completa tu fecha de nacimiento y género"
      />
      <div className={classes["auth__birth-grid"]}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="es">
          <DatePicker
            error
            inputRef={dateRef}
            disableFuture
            label={"DD/MM/AAAA"}
            className="Mui-error"
          />
        </LocalizationProvider>
        <FormControl
          error={genderHasError}
          className={classes["auth__birth-gender"]}
          fullWidth
        >
          <InputLabel id="genderTitle">Género</InputLabel>
          <Select
            native
            inputRef={genderRef}
            labelId="genderTitle"
            id="gender"
            label="Género"
            value={genderSelected}
            onChange={handleGenderChange}
          >
            <option aria-label="None" value="" />
            <option value={"woman"}>Mujer</option>
            <option value={"man"}>Hombre</option>
            <option value={"na"}>Prefiero no decirlo</option>
          </Select>
          <FormHelperText>
            {genderHasError ? "Selecciona género" : " "}
          </FormHelperText>
        </FormControl>
      </div>
      <div className={classes["auth__buttons-box-end"]}>
        <Button onClick={birthSubmitHandler} variant="contained">
          Siguiente
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default BirthForm;
