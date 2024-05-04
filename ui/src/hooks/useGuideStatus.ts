// Consistent
const guideStatusLocaleStorageName = "xlsx-gui-guide-status" as const;

// Types
type GuideStatus = "hide" | "display";

// Util Functions

// Sets the state of guide to local storage
const setGuideStatus = (v: GuideStatus) =>
  window.localStorage.setItem(guideStatusLocaleStorageName, v);

/** Gets the current state of guide from local storage */
const getGuideStatus = (): GuideStatus => {
  const status = window.localStorage.getItem(guideStatusLocaleStorageName);

  // Returning display if the variable doesn't exits
  if (status === null) return "display";

  // Incase the value is set to a wrong value, resetting it and returning display as the default status
  if (!["display", "hide"].includes(status)) {
    setGuideStatus("display");
    return "display";
  }

  return status as GuideStatus;
};

/** Provides methods of checking if we have to render the guide or not */
const useGuideStatus = () => {
  return {
    get: getGuideStatus,
    set: setGuideStatus,
  };
};

export default useGuideStatus;
