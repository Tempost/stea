import { GlobalState } from "little-state-machine";

const formState: GlobalState = {
  formState: {
    member: {
      uid: 0,
      createdAt: null,
      updatedAt: null,
      name: "",
      memberType: "",
      memberStatus: "",
      rankingId: null,
      boardMember: false,
      address: "",
      city: "",
      state: "",
      zip: 0,
      phone: "",
      email: null,
      previousMember: false,
      riderLevel: "",
      confirmed: false
    },
    familyMember: {
      uid: 0,
      createdAt: null,
      updatedAt: null,
      name: "",
      email: null,
      riderLevel: "",
      memberId: 0
    },
    corporateMember: {
      uid: 0,
      name: "",
      createdAt: null,
      updatedAt: null,
      address: "",
      city: "",
      state: "",
      zip: 0,
      phone: "",
      email: null,
      contact: "",
      regType: ""
    },
    horseOnly: {
      uid: 0,
      createdAt: null,
      updatedAt: null,
      horseRN: "",
      horseAKA: null,
      registrationDate: null,
      regType: "",
      memberId: null,
      corpId: null,
      rankingId: null
    }
  }
};

export default formState;
