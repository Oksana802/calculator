import { createSelector } from "@reduxjs/toolkit";
import { selectQueryFilter } from "../filters/selectors";

export const selectorContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectorContacts, selectQueryFilter],
  (contacts, filter) => {
    if (!filter.trim()) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);
