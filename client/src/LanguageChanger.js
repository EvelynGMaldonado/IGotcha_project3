import React, {useState} from 'react';
import { IntlProvider } from "react-intl";
import App from './App';

//function to access to the current language
// function getLang() {
//     if (navigator.languages != undefined) 
//     return navigator.languages[0]; 
// return navigator.language;
// }

const messagesInEnglish = {
    login: "Login",
    login1: "Login",
    profile: "Profile",
    logout:"Logout",
    missionSatement: "Mission Statement",
    findService:"Find service",
    offerService:"Offer Service",
    password:"Password",
    signUp:"Sign Up",
    howItWorks:"How it works",
    howItWorksText:"Search for whatever you need, explore the profile of your possible candidates, find your match, hire and repeat. You can also share your skills and get hired by others who could use your help. It's fun and easy to start.",
    aboutUs:"About us",
    contactUs:"Contact us",
    language:"Language",
    myProfile:"My User Profile",
    biography:"Biography",
    myServices:"My Services",
    editProfile:"Edit Profile",
    go:"Go",
    art:"Art",
    beauty:"Beauty",
    childCare: "Child Care",
    eventPlanning:"Event Planning",
    graphicDesign:"Graphic Design",
    handyMan:"Handy man",
    houseCleaning:"House Cleaning",
    makeUp:"Make up",
    personalAssistant:"Personal Assistant",
    personalTraining:"Personal Training",
    petCare:"Pet Care",
    photography:"Photography",
    translations:"Translations",
    tutoring:"Tutoring",
    webDesign:"Web Design",
    zipCode:"Zip Code",
    serviceName:"Service name",
    description:"Description",
    location:"Location",
    hourlyRate:"Hourly Rate",
    moreInfo:"More Details",
    results:"Your search results",
    phoneNumber:"Phone Number",
    addAnImage:"Add an image",
    typeOfService:"Type of service",
    addMyService:"Add a service",
    cancel:"Cancel",
    delete:"Delete",
    addAService:"Add a Service",
    addNewService:"Add a new service",
    editMyProfile:"Edit My Profile",
    name:"Name",
    lastName:"Last Name",
    updateProfPic:"Update profile picture",
    saveChanges:"Save Changes",
    email:"Email",
    missionStateText:"The IGotcha app helps you find qualified individuals in your area to connect you to the services that you need. Others can also use the app to discover and hire your services. We, as humans, will always need a hand from others; conversely, we also have skills to share and help those around us.",
    userName:"User Name"


}

const messagesInSpanish = {
    login:"Iniciar sesion",
    login1:"Inicia sesión",
    profile: "Perfil",
    logout:"Cerrar Sesión",
    missionSatement: "Nuestra Misión",
    findService:"Encuentra un Servicio",
    offerService:"Brinda un Servicio",
    password:"Contraseña",
    signUp:"Regístrate",
    howItWorks:"Cómo funciona",
    howItWorksText:"Busca el servicio que necesites. Explora el perfil de un posible proveedor para encontrar al ideal para ti, contrátalo, y repite el proceso. Tambien pudes compartir tus dones con quien pueda requerir de tus servicios. Comenzar es fácil y divertido.",
    aboutUs:"Conócenos",
    contactUs:"Contáctanos",
    language:"Idioma",
    myProfile:"Mi Perfil de Usuario",
    biography:"Biografía",
    myServices:"Mis servicios",
    editProfile:"Editar Perfil",
    go:"Vamos",
    art:"Arte",
    beauty:"Belleza",
    childCare: "Cuidado de niños",
    eventPlanning:"Planificación de eventos",
    graphicDesign:"Diseño Gráfico",
    handyMan:"Reparaciones del Hogar",
    houseCleaning:"Limpieza",
    makeUp:"Maquillaje",
    personalAssistant:"Asistente Personal",
    personalTraining:"Entrenamiento Personal",
    petCare:"Cuidado de mascotas",
    photography:"Fotografía",
    translations:"Traducción",
    tutoring:"Tutoría",
    webDesign:"Diseño digital",
    zipCode:"Código Postal",
    serviceName:"Nombre del Servicio",
    description:"Descripción",
    location:"Ubicación",
    hourlyRate:"Tarifa por hora",
    moreInfo:"Más Detalles",
    results:"Resultados de tu búsqueda",
    phoneNumber:"Número de teléfono",
    addAnImage:"Agrega una imagen",
    typeOfService:"Clase de servicio",
    addMyService:"Registrar mi servicio",
    cancel:"Cancelar",
    delete:"Eliminar",
    addAService:"Brinda un Servicio",
    addNewService:"Registra un nuevo servicio",
    editMyProfile:"Editar Mi Perfil",
    name:"Nombre",
    lastName:"Apellido",
    updateProfPic:"Actualizar mi foto de perfil",
    saveChanges:"Actualizar",
    email:"Correo Electrónico",
    missionStateText:"La aplicación IGotcha te ayuda a encontrar personas calificadas en su área para ponerte en contacto con los servicios que necesita. Los demás también pueden utilizar la aplicación para descubrir y contratar tus servicios. Nosotros, como seres humanos, siempre necesitaremos que alguién nos brinde una mano amiga; a la inversa, también tenemos habilidades para compartir y ayudar a quienes nos rodean.",
    userName:"Nombre de usuario"

    

}


let languageProps = {
    messages: messagesInEnglish,
    locale: "en-US"
}

const LanguageChanger =() => {
    const [locale, setLocale] = useState (
        "English"
    )

    if(locale === "English") {
        languageProps = {
            messages: messagesInEnglish,
            locale: "en-US"
        }
    } else if (locale === "Spanish") {
        languageProps = {
            messages: messagesInSpanish,
            locale: "es-ES"
        }
    }
    return (
        <IntlProvider messages={languageProps.messages} locale={languageProps.locale} defaultLocale="en">
            <App updateLocal={setLocale} />
        </IntlProvider>
    )


}
export default LanguageChanger;