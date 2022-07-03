import { FamilyMember, Horse, Member, corporateMember} from "@prisma/client";
import { Address } from "cluster";
import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    formState: {
      member: Member,
      familyMember: FamilyMember,
      corporateMember: corporateMember,
      horseOnly: Horse
    }
  }
}
