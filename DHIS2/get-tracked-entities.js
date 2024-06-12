/**
 * Prerequsities
 * 1. Credential to DHIS2 version 38+
 * 2. Input as defined at assets/events-from-tracker.contants.json
 */

// Iterate over each instance of events

fn((state) => ({ ...state, teisWithEnrollments: [] }));

// Iterate over each instance of events
each(
  $.data.instances,
  get(
    `tracker/trackedEntities/${$.data.trackedEntity}.json`,
    { program: $.program, fields: "*" },
    {},
    (state) => {
      console.log(
        "via dhis2 adaptor, we get",
        JSON.stringify(state.data, null, 2)
      );
      // handle teisWithEnrollments in the get callback
      state.teisWithEnrollments.push(state.data);
      return state;
    }
  )
);

// only return what we really need!
fn((state) => {
  const { teisWithEnrollments } = state;
  return { teisWithEnrollments };
});
