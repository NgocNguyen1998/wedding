import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  useMediaQuery,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { guests } from "../../models/guests";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  departure_timeData,
  partiesData,
  return_timeData,
} from "../../models/data";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5003/api"; // Sử dụng URL từ file .env nếu có
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Form = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const lowerName = name?.toLowerCase();
  // Kiểm tra xem khách có trong danh sách không
  const guest = guests.find((g) => g.Guest_Code.toLowerCase() === lowerName);
  const [guestData, setGuestData] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!guest || !guest.Guest_Name) return; // Nếu không có guest, không gọi API

    async function fetchGuestData() {
      try {
        const encodedName = encodeURIComponent(guest.Guest_Name);
        const apiUrlWithParams = `${apiUrl}/getInvitation/${encodedName}`;

        const response = await axios.get(apiUrlWithParams);

        if (response.data?.data) {
          setGuestData(response.data.data);
        } else {
          console.warn("⚠️ API không có dữ liệu hợp lệ:", response.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn(
            "⚠️ Không tìm thấy dữ liệu, giữ nguyên dữ liệu hiện tại."
          );
        } else {
          console.error("❌ Lỗi khi gọi API:", error);
        }
      }
    }

    fetchGuestData();
  }, [guest]);

  const [formData, setFormData] = useState({
    name: guest?.Guest_Name || "",
    id: guest?.id || "",
    phone: "",
    group:
      guest?.Friend === "Groom" ? "Groom's Friend" : "Bride's Friend" || "",
    numberOfPeople: "",
    attendingDinner: [],
    attending: "",
    departure_time: "",
    returning_time: "",
    message: "",
  });
  useEffect(() => {
    if (guestData) {
      setFormData((prev) => ({
        ...prev,
        name: guestData.name || prev.name,
        id: prev.id,
        phone: guestData.phone || prev.phone,
        numberOfPeople: guestData.numberOfPeople || prev.numberOfPeople,
        attendingDinner:
          guestData.attendingDinner.map((option) => option) ||
          prev.attendingDinner,
        attending: guestData.attending || prev.attending,
        departure_time: guestData.departure_time || prev.departure_time,
        returning_time: guestData.returning_time || prev.returning_time,
        message: guestData.message || prev.message,
      }));
    }
  }, [guestData]);
  const handleChange = (e, newValue) => {
    if (Array.isArray(newValue)) {
      // Nếu đang thay đổi trong Autocomplete (chọn nhiều mục)
      if (newValue.some((option) => option.title === "None")) {
        setFormData((prev) => ({
          ...prev,
          attendingDinner: [{ title: "None" }], // Chỉ giữ lại "None"
          attending: "no",
          departure_time: "",
          returning_time: "",
          numberOfPeople: 0,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          attendingDinner: newValue, // Cập nhật danh sách đã chọn
          attending: "yes",
        }));
      }
      return;
    }
    const { name, value, type, checked } = e.target;

    let newValue1 = type === "checkbox" ? checked : value;

    if (name === "numberOfPeople") {
      // Chỉ cho phép số, không âm, và giới hạn dưới 10
      if (/^[0-3]$/.test(value)) {
        // Chỉ cho phép giá trị từ 0 đến 9
        newValue1 = value;
      } else {
        return;
      }
      if (Number(value) === 0) {
        setFormData((prev) => ({
          ...prev,
          attending: "no",
          attendingDinner: [{ title: "None" }],
          departure_time: "",
          returning_time: "",
        }));
      }
    }
    if (name === "phone") {
      // Chỉ cho phép nhập số (0-9) và tối đa 11 chữ số
      if (/^\d{0,11}$/.test(value)) {
        newValue1 = value;
      } else {
        return;
      }
    }

    if (name === "attending" && value === "no") {
      // If the user selects "No, I am busy", set attendingDinner to ["None"] (as an array) and numberOfPeople to 0
      setFormData((prev) => ({
        ...prev,
        attending: value,
        attendingDinner: [{ title: "None" }], // Set to array to avoid MUI error
        numberOfPeople: "0",
        departure_time: "",
        returning_time: "",
      }));
      return; // Don't proceed with the default behavior
    } else if (name === "attending" && value === "yes") {
      // If the user selects "Yes, I am coming", reset attendingDinner and numberOfPeople
      setFormData((prev) => ({
        ...prev,
        attending: value,
        attendingDinner: [],
        numberOfPeople: "",
      }));
      return; // Don't proceed with the default behavior
    }

    if (
      (name === "departure_time" && value !== "") ||
      (name === "returning_time" && value !== "") ||
      (name === "numberOfPeople" && value > 0)
    ) {
      setFormData((prev) => ({
        ...prev,
        attending: "yes",
      }));
    }

    // For other fields, just update normally
    setFormData((prev) => ({
      ...prev,
      [name]: newValue1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that when attending is "yes", numberOfPeople is greater than 0
    // and attendingDinner is not "None"
    if (formData.attending === "yes") {
      if (
        formData.numberOfPeople <= 0 ||
        formData.attendingDinner.some((option) => option.title === "None") ||
        formData.attendingDinner.length === 0
      ) {
        setErr(
          "Please select a valid number of people and attending dinner options."
        );
        return;
      }
      if (formData.departure_time === "") {
        setErr("Please select a valid departure time.");
        return;
      }
      if (formData.returning_time === "") {
        setErr("Please select a valid returning time.");
        return;
      }
    }

    const dataToSend = {
      ...formData,
      numberOfPeople: Number(formData.numberOfPeople),
      id: guest.id,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/confirmInvitation`,
        dataToSend
      );

      if (response.data.message === "created") {
        alert("confirmInvitation has been sent successfully!");
      } else if (response.data.message === "updated") {
        alert("confirmInvitation has been updated successfully!");
      }

      setTimeout(() => {
        setErr("");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi gửi lời mời:", error);
      alert("Có lỗi xảy ra khi gửi lời mời. Vui lòng thử lại!");
    }
  };
  const parties = partiesData;
  const departure = departure_timeData;
  const returning = return_timeData;

  const getFilteredParties = (guest) => {
    let availableParties = parties
      .filter((party) => guest[party.key] === "Yes")
      .map((party) => ({ title: party.title }));

    availableParties.push({ title: "None" });
    return availableParties;
  };
  const getFilteredDepatureTime = (guest) => {
    let availableDeparture = departure
      .filter((departure) => guest[departure.key] === "Yes")
      .map((departure) => ({ title: departure.title }));

    return availableDeparture;
  };
  const getFilteredReturnTime = (guest) => {
    let availableReturn = returning
      .filter((returning) => guest[returning.key] === "Yes")
      .map((returning) => ({ title: returning.title }));

    return availableReturn;
  };
  return (
    <Box
      sx={{
        maxHeight: "640px",
        overflowY: "scroll",
        padding: 2,
        backgroundColor: "#ecdbdb",
        width: isMobile ? "95%" : "55%",
        boxSizing: "border-box",
        justifyContent: "center",
        position: "relative",
        borderRadius: 2,
        border: "2px solid #64ba8b",
        position: "relative",
        color: "#3d7556",
        "&::-webkit-scrollbar": {
          width: "8px", // Độ rộng scrollbar
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f13a", // Màu nền của track scrollbar
          borderRadius: "10px",
          margin: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#64ba8b", // Màu của thanh cuộn
          borderRadius: "10px",
          "&:hover": {
            background: "#3d7556", // Màu khi hover
          },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            disabled
            sx={{
              "& .MuiInputBase-root": {
                color: "#305b43", // Input text color
              },
              "& .MuiInputLabel-root": {
                color: "#3a875d !important", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              },
              "& .MuiInputBase-input": {
                color: "#3d7556", // Input field text color (if needed)
                fontSize: "15px",
              },
              "& .MuiFormHelperText-root": {
                color: "#3d7556", // Helper text color (if present)
              },
            }}
          />
          <FormControl fullWidth required sx={{ textAlign: "left" }}>
            <InputLabel
              sx={{
                textAlign: "left",
                color: "#3a875d", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Relationship
            </InputLabel>
            <Select
              name="group"
              value={formData.group}
              onChange={handleChange}
              label="Relationship"
              sx={{
                "& .MuiInputBase-input": {
                  color: "#3d7556 !important", // Input field text color (if needed)
                  fontSize: "15px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#e07a7a",
                  },
                },
              }}
              disabled
            >
              <MenuItem value="Bride's Friend">Bride's Friend</MenuItem>
              <MenuItem value="Groom's Friend">Groom's Friend</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#3a875d", // Change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a875d", // Change the border color when focused
                },
              },
              "& .MuiInputBase-root": {
                color: "#305b43",
              },
              "& .MuiInputLabel-root": {
                color: "#3a875d", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              },
              "& .MuiInputBase-input": {
                color: "#3d7556 !important", // Input field text color (if needed)
                fontSize: "15px",
              },
              "& .MuiFormHelperText-root": {
                color: "#3d7556", // Helper text color (if present)
              },
            }}
          />

          <FormControl sx={{ paddingX: 1.8, color: "#3a875d" }}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                textAlign: "left",
                fontSize: 14,
                color: "#3a875d", // Label text color
                fontWeight: "600",
              }}
            >
              Will You Attend?
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                color: "#3a875d",
              }}
            >
              <FormControlLabel
                value="yes"
                control={
                  <Radio
                    sx={{
                      color: "#3a875d",
                      "&.Mui-checked": {
                        color: "#3a875d", // Change color when selected
                      },
                    }}
                  />
                }
                label="Yes, I'll be able to attend"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "15px",
                  }, // Target the label's typography
                }}
              />
              <FormControlLabel
                value="no"
                control={
                  <Radio
                    sx={{
                      color: "#3a875d",
                      "&.Mui-checked": {
                        color: "#3a875d", // Change color when selected
                      },
                    }}
                  />
                }
                label="Sadly, I won't be there"
                sx={{
                  "& .MuiTypography-root": { fontSize: "15px" }, // Target the label's typography
                }}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="How many will be attending?(1 means only you)"
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            fullWidth
            required
            disabled={formData.attending === "no"} // Disable if "No, I am busy" is selected
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#3a875d", // Change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a875d", // Change the border color when focused
                },
              },
              "& .MuiInputBase-root": {
                color: "#305b43",
              },
              "& .MuiInputLabel-root": {
                color: "#3a875d", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              },
              "& .MuiInputBase-input": {
                color: "#3d7556 !important", // Input field text color (if needed)
                fontSize: "15px",
              },
              "& .MuiFormHelperText-root": {
                color: "#3d7556", // Helper text color (if present)
              },
            }}
          />
          {/* <FormControl fullWidth required sx={{ textAlign: "left" }}>
            <InputLabel sx={{ textAlign: "left" }}>
              Which party will you attend?(Multiple choices)
            </InputLabel>
            <Select
              name="attendingDinner"
              value={formData.attendingDinner}
              onChange={handleChange}
              label="Which party will you attend?(Multiple choices)"
              sx={{ textAlign: "left" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#e07a7a", // Chỉnh màu nền của menu khi mở lên
                  },
                },
              }}
              multiple
              disabled={formData.attending === "no"} // Disable if "No, I am busy" is selected
            >
              <MenuItem value="Dinner (Mar 9th)">Dinner (Mar 9th)</MenuItem>
              <MenuItem value=" Wedding (Mar 10th)">
                Wedding (Mar 10th)
              </MenuItem>
              <MenuItem value=" Dinner (Mar 10th)">Dinner (Mar 10th)</MenuItem>
              <MenuItem value="Wedding (Mar 11th)">Wedding (Mar 11th)</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
          </FormControl> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#3a875d", // Change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a875d", // Change the border color when focused
                },
              },
              "& .MuiInputBase-root": {
                color: "#305b43",
              },
              "& .MuiInputLabel-root": {
                color: "#3a875d", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              },
              "& .MuiInputBase-input": {
                color: "#3d7556 !important", // Input field text color (if needed)
                fontSize: "15px",
              },
              "& .MuiFormHelperText-root": {
                color: "#3d7556", // Helper text color (if present)
              },
            }}
            name="attendingDinner"
            onChange={handleChange}
            required
            value={formData.attendingDinner || []}
            disabled={formData.attending === "no"}
            multiple
            id="checkboxes-tags-demo"
            options={getFilteredParties(guest)}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8, color: "#3a875d" }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              );
            }}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Which party will you attend?(Multiple choices)"
                placeholder="parties"
              />
            )}
          />
          {getFilteredDepatureTime(guest)?.length > 0 && (
            <FormControl
              sx={{ paddingX: 1.8 }}
              disabled={formData.attending === "no"}
              // required
            >
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  textAlign: "left",
                  fontSize: 14,
                  color: "#3a875d", // Label text color
                  fontWeight: "600",
                }}
              >
                Which departure would you prefer?
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {getFilteredDepatureTime(guest).map((item) => (
                  <FormControlLabel
                    key={item.key}
                    value={item.title}
                    control={
                      <Radio
                        sx={{
                          color: "#3a875d",
                          "&.Mui-checked": {
                            color: "#3a875d", // Change color when selected
                          },
                        }}
                      />
                    }
                    label={item.title}
                    sx={{
                      "& .MuiTypography-root": { fontSize: "15px" }, // Target the label's typography
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          {getFilteredReturnTime(guest)?.length > 0 && (
            <FormControl
              sx={{ paddingX: 1.8 }}
              disabled={formData.attending === "no"}
              // required
            >
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  textAlign: "left",
                  fontSize: 14,
                  color: "#3a875d", // Label text color
                  fontWeight: "600",
                }}
              >
                What time is the return?
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="returning_time"
                value={formData.returning_time}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  color: "#3a875d",
                }}
              >
                {getFilteredReturnTime(guest).map((item) => (
                  <FormControlLabel
                    key={item.key}
                    value={item.title}
                    control={
                      <Radio
                        sx={{
                          color: "#3a875d",
                          "&.Mui-checked": {
                            color: "#3a875d", // Change color when selected
                          },
                        }}
                      />
                    }
                    label={item.title}
                    sx={{
                      "& .MuiTypography-root": { fontSize: "15px" }, // Target the label's typography
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          <TextField
            label={`Wishes for the ${guest.Friend}`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={1}
            maxRows={5}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#3a875d", // Change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a875d", // Change the border color when focused
                },
              },
              "& .MuiInputBase-root": {
                color: "#305b43",
              },
              "& .MuiInputLabel-root": {
                color: "#3a875d", // Label text color
                fontWeight: "600",
                fontSize: "16px",
              },
              "& .MuiInputBase-input": {
                color: "#3d7556 !important", // Input field text color (if needed)
                fontSize: "15px",
              },
              "& .MuiFormHelperText-root": {
                color: "#3d7556", // Helper text color (if present)
              },
            }}
          />
          <Typography sx={{ color: "#cd1212", paddingBottom: err ? 2 : 0 }}>
            {err}
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            width: "25%",
            margin: "0 auto",
            backgroundColor: "#5ea364",
            color: "#f2ebeb",
            position: "sticky",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
          }}
        >
          {guestData ? "Update" : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default Form;
