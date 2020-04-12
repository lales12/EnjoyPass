import { $gray, $primaryColor, $dangerColor } from "./variables";

export const $input = {
    borderRadius: 25,
    borderWidth: 0.5,
    fontFamily: "regular",
    borderColor: $gray,
    fontSize: 16,
    height: 50,
    paddingLeft: 15,
};

export const $label = {
    color: $primaryColor,
    fontFamily: "bold",
    fontSize: 16,
    fontWeight: "700",
};

export const $buttonPrimary = {
    backgroundColor: $primaryColor,
    height: 50,
    borderColor: $primaryColor,
    borderRadius: 25,
    color: "#fff",
};

export const $buttonTextEmpty = {
    color: $primaryColor,
    fontFamily: "bold",
    fontSize: 16,
};

export const $buttonEmpty = {
    backgroundColor: "transparent",
    fontFamily: "bold",
    height: 50,
    borderColor: $primaryColor,
    borderRadius: 25,
    color: $primaryColor,
};

export const $buttonDelete = {
    backgroundColor: "transparent",
    height: 50,
    borderColor: $dangerColor,
    borderRadius: 25,
    color: $dangerColor,
};

export const $alertText = {
    fontFamily: "regular",
    color: "#6b51d9",
    fontSize: 12,
};

export const $buttonText = {
    fontFamily: "bold",
    color: "#fff",
    fontSize: 16,
};
