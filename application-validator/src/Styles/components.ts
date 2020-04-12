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
    height: 40,
    borderColor: $primaryColor,
    borderRadius: 20,
    color: "#fff",
};

export const $buttonTextEmpty = {
    color: $primaryColor,
    fontSize: 16,
};

export const $buttonEmpty = {
    backgroundColor: "transparent",
    height: 37,
    borderColor: $primaryColor,
    borderRadius: 20,
    color: $primaryColor,
};

export const $buttonDelete = {
    backgroundColor: "transparent",
    height: 37,
    borderColor: $dangerColor,
    borderRadius: 20,
    color: $dangerColor,
};

export const $alertText = {
    color: "#6b51d9",
    fontSize: 12,
};

export const $buttonText = {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
};
