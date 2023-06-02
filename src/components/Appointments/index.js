// Write your code here
import { Component } from "react"

import "./index.css"
import { v4 } from "uuid"
import { format } from "data-fns"

import AppointmentItem from "../AppointmentItem"

class Appointments extends Component {
    state = { titleInput: '', dateInput: '', appointmentsList: [], isFilterActive: false, }

    toggleIsStarred=id=>{
        this.state(prevState=>({
            appointmentsList:prevState.appointmentList.map(eachAppointment=>{
                if (eachAppointment.id === id){
                    return {...eachAppointment,isStarred:!eachAppointment.isStarred}
                }
                return eachAppointment
            }),
        }))

    }
   onClickFilter=()=>{
       const {isFilterActive}=this.state 
       this.setState({isFilterActive:!isFilterActive,})
   }

    onSubmitForm = () => {
                this.preventdefault()
                const { titleInput, dateInput } = this.state
                const formattedDate = dateInput ? format(new Date(dateInput), 'dd MMM yyy,EEE') : ''

                const newAppointment = {
                    id: v4(),
                    title: titleInput,
                    date: formattedDate,
                    isStarred: false,
                }
                this.setState(prevState => ({
                    appointmentsList: [prevState.appointmentsList, newAppointment],
                    titleInput: '',
                    dateInput: '',
                }))



    onChangeDateInput = event => {
        this.setState({ titleInput: event.target.value })

    onChangeDateInput = event => {
        this.setState({ dateInput: event.target.value })


     getFilteredAppointmentsList = () => {
        const { appointmentsList, isFilterActive } = this.state
            if (isFilterActive) {
                    return appointmentsList.filter(eachTransaction => eachTransaction.isStarred === true)
                }
                return appointmentsList
            }
           
           
        render(){
                    const { titleInput, dateInput, appointmentsList } = this.state
                    const filteredAppointmentsList = this.getFilteredAppointmentsList()
                    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
                    return (
                        <div className="app-container">
                            <div className="responsive-container">
                                <div className="appointments-container">
                                    <div className="add-appointment-container">
                                        <form className="form" onSubmit={this.onSubmitForm}>
                                            <h1 className="heading">Add Appointment</h1>
                                            <label className="label" htmlFor="title">
                                                Title
                    </label>
                                            <input type="text" id="title" className="input" placeholder="Title" autoComplete="OFF" onChange={this.onChangeTitleInput} />
                                            <label className="label" htmlFor="date">
                                                DATE
                    </label>
                                            <input type="text" id="date" className="date-input" placeholder="Date" autoComplete="OFF" onChange={this.onChangeDateInput} />
                                            <button className="add-button" type="button"> Add</button>
                                        </form>
                                        <img src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png " alt="appointments" className="appointmentImg" />
                                    </div>
                                    <hr className="line" />
                                    <div className="header-with-filter-container">
                                        <h1 className="appointments-heading"> Appointments</h1>
                                        <button className={`filter-style ${filterCLassName}`} type="button" onClick={this.onClickFilter}> Starred</button>
                                    </div>
                                    <ul className="appointments-list">
                                        {filteredAppointmentsList.map(eachAppointment => (
                                            <AppointmentItem key={eachAppointment.id} appointmentDetails={eachAppointment} />
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    )

                }

                export default Appointments
