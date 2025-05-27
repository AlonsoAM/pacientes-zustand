import {usePatientStore} from "../store/store.ts";

const PatientsList = () => {

  const patients = usePatientStore(state => state.patients)

  console.log({patients})

  return (
    <div>PatientsList</div>
  )
}
export default PatientsList
