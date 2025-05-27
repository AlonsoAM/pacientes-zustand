import {useEffect} from "react";
import {useForm, type SubmitHandler} from "react-hook-form";
import Error from "./Error.tsx";
import type {DraftPatient, Patient} from "../types/Patient";
import {usePatientStore} from "../store/store.ts";
import { notifyInfo } from "../utils/notifyUtils";

const PatientForm = () => {
  // Agregamos setValue para poder establecer valores programáticamente
  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<DraftPatient>()
  
  // Obtenemos todas las funciones necesarias del store
  const addPatient = usePatientStore(state => state.addPatient)
  const patientToEdit = usePatientStore(state => state.patientToEdit)
  const updatePatient = usePatientStore(state => state.updatePatient)
  const clearPatientToEdit = usePatientStore(state => state.clearPatientToEdit)

  // Efecto para cargar los datos del paciente cuando se va a editar
  useEffect(() => {
    if (patientToEdit) {
      setValue('name', patientToEdit.name)
      setValue('caretaker', patientToEdit.caretaker)
      setValue('email', patientToEdit.email)
      setValue('date', patientToEdit.date)
      setValue('symptoms', patientToEdit.symptoms)
    }
  }, [patientToEdit, setValue])

  const registerPatient: SubmitHandler<DraftPatient> = (data: DraftPatient) => {
    if (patientToEdit) {
      // Si estamos editando, actualizamos el paciente existente
      const updatedPatient: Patient = {
        ...data,
        id: patientToEdit.id
      }
      updatePatient(updatedPatient)
    } else {
      // Si estamos creando un nuevo paciente
      addPatient(data)
    }
    
    // Limpiamos el formulario en ambos casos
    reset()
  }

  
  // Función para cancelar la edición
  const handleCancel = () => {
    clearPatientToEdit()
    reset()
    notifyInfo('Edición cancelada');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        {patientToEdit ? 'Editar Paciente' : 'Seguimiento Pacientes'}
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        {patientToEdit 
          ? 'Modifica la información del paciente' 
          : 'Añade Pacientes y '}
        {!patientToEdit && <span className="text-indigo-600 font-bold">Administralos</span>}
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 50,
                message: 'El nombre no puede exceder los 50 caracteres'
              }
            })}
          />
          {errors.name?.message && (
            <Error>
              {errors.name.message.toString()}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register('caretaker', {
              required: 'El nombre del propietario es obligatorio'
            })}
          />
          {errors.caretaker?.message && (
            <Error>
              {errors.caretaker.message.toString()}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido'
              }
            })}
          />
          {errors.email?.message && (
            <Error>
              {errors.email.message.toString()}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register('date', {
              required: 'La fecha es obligatoria'
            })}
          />
          {errors.date?.message && (
            <Error>
              {errors.date.message.toString()}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register('symptoms', {
              required: 'Los síntomas son obligatorios'
            })}
          ></textarea>
          {errors.symptoms?.message && (
            <Error>
              {errors.symptoms.message.toString()}
            </Error>
          )}
        </div>

        <div className={`${patientToEdit ? 'flex gap-3' : ''}`}>
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={patientToEdit ? 'Guardar Cambios' : 'Guardar Paciente'}
          />
          
          {patientToEdit && (
            <button
              type="button"
              className="bg-gray-600 w-full p-3 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
export default PatientForm
