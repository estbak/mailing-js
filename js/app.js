document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email')
    const inputCC = document.querySelector('#cc')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    inputCC.addEventListener('input', validar)

    formulario.addEventListener('submit', enviaremail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault()

        resetFormulario()
    })

    function enviaremail(e) {
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetFormulario()

            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 
            'mt-10', 'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Correo enviado exitosamente'

            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 2000);
        }, 3000);
    }

    function validar(e) {
        if (e.target.value.trim() === '' &&  e.target.id !== 'cc') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido',e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        if (e.target.value.trim() !== '' && e.target.id === 'cc' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido',e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        email[e.target.name] = e.target.value.trim().toLowerCase()
        
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)

        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {
        if (email['email'] === '' || email['asunto'] === '' || email['mensaje'] === ''
            || email['cc'] !== '' && !validarEmail(email['cc'])) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        }


        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

    function resetFormulario() {
        email.email = ''
        email.cc = ''
        email.asunto = ''
        email.mensaje = ''

        formulario.reset()
        comprobarEmail()
    }
})