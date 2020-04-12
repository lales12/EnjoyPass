import { $gray, $primaryColor, $dangerColor } from "./variables";

export const $input = {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: $gray,
    height: 37,
    paddingLeft: 8,
};

export const $label = {
    color: $primaryColor,
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
    color: "#6b51d9",
    fontSize: 12,
};

export const $buttonText = {
    color: "#fff",
    fontSize: 16,
    fontFamily: "bold",
};
