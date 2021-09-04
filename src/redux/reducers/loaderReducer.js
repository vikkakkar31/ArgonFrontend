
const INITIAL_STATE = {
  load: false,
	error: false,
};

export default function fullLoader (state = INITIAL_STATE, actions) {
	if (actions.type.indexOf("_START") > -1) {
		return {
			...state,
			load: true,
		};
	}

	if (actions.type.indexOf("_SUCCESS") > -1) {
		return {
			...state,
			load: false,
		};
	}

	if (actions.type.indexOf("_FAILURE") > -1) {
		if (actions.error && actions.error.code === "ERROR_INVALID_TOKEN") {
      return {
        error: true,
        load: false,
      };
		}

    return {
      ...state,
      load: false,
    }
	}

	return state;
}
