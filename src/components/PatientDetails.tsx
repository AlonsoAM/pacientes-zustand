import type {Patient} from "../types/Patient.ts";

type PatientDetailsProps = {
  patient: Patient
}

const PatientDetails = ({patient}: PatientDetailsProps) => {
  return (
    <div>
      {patient.name}
    </div>
  )
}
export default PatientDetails
