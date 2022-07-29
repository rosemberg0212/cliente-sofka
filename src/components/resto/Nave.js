import React, { useEffect, useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap';
import { AiFillHome } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import { useNave } from '../../context/naves/naveContext'
import Swal from 'sweetalert2'

const Nave = () => {

    //extreamos del state global los metodos a utilizar
    const { getNaves, naves, getNavesTipo, tipoNaves, registrarNave, deleteNaves } = useNave()

    const params = useParams();
    let num = 1;

    //metodo para comparar el id pasado por parametro y el que viene de la bd
    const encontraT = tipoNaves.find((tipo) => tipo._id === params.id)

    useEffect(() => {

        getNaves()
        getNavesTipo()
    }, [getNaves, getNavesTipo])

    //state para la creacion de nueva nave
    const [navesT, setnaves] = useState({
        actividad: '',
        nombre: '',
        entidad: '',
        tipo: '',
        combustible: ''
    })

    //destructuracion del state
    const { actividad, nombre, entidad, tipo, combustible } = navesT;

    //state para controlar el modal
    const [show, setShow] = useState(false);

    //metodo para cerrar el modal
    const handleClose = () => setShow(false);
    //metodo para abrir el modal
    const handleShow = () => setShow(true);

    //busqueda
    const [search, setSearch] = useState('')

    //funcion busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    //metodo para cacturar los valores del form
    const onChange = (e) => {
        setnaves({
            ...navesT,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //validacion del formulario
        if(actividad.trim() === '' || nombre.trim() === '' || entidad.trim() === '' || tipo.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Falta un campo obligatorio.',
                showConfirmButton: true,
                // timer: 1800
              }) 
              return
        }

        //petecion para crear nueva nave
        registrarNave({
            actividad, 
            nombre, 
            entidad, 
            tipo, 
            combustible
        })
        setShow(false)
        setnaves({
            actividad: '', 
            nombre: '', 
            entidad: '', 
            tipo: '', 
            combustible: ''
        })
    }

    //bandera para borrar elementos
    const borrar = (id)=>{
        Swal.fire({
            title: 'Esta seguro que desea borrar?',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteNaves(id)
            }
          })
    }
    //metodo para filtrar las naves
    if (!search) {
        var results = !encontraT.nombre ? naves : naves.filter((dato) => dato.tipo.toLowerCase().includes(encontraT.nombre.toLocaleLowerCase()))
    } else {
        results = !search ? naves : naves.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
    }

    return (
        <div className='content-naves'>
            <h2 className='title'>Clasificación de las naves espaciales</h2>
            <h3>{encontraT.nombre}</h3>
            <Link to='/' className='home'>
                <AiFillHome />
            </Link>

            <div className='table'>
                <div className='ubica'>
                    <Button variant="primary" className='bt' onClick={handleShow}>Nueva nave</Button>
                    <div className='buscador'>
                        <label>Filtrar por nombre</label>
                        <input value={search} onChange={searcher} type='text' placeholder='search' className='search' />
                    </div>
                </div>


                <Modal show={show} onHide={handleClose} className='modal'>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear nueva nave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className='conten-modal' onSubmit={onSubmit}>
                            <div className='org'>
                                <label>Tiempo de actividad de la nave.</label>
                                <input
                                    className='inputs'
                                    type='text'
                                    name='actividad'
                                    value={actividad}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='org'>
                                <label>Nombre de la nave.</label>
                                <input
                                    className='inputs'
                                    type='text'
                                    name='nombre'
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='org'>
                                <label>Organización encargada de la nave.</label>
                                <input
                                    type='text'
                                    name='entidad'
                                    className='inputs'
                                    value={entidad}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='org'>
                                <label>Tipo de nave.</label>
                                <select
                                    name='tipo'
                                    className='inputs'
                                    value={tipo}
                                    onChange={onChange}
                                >
                                    <option>seleccione tipo</option>
                                    <option>VEHÍCULOS LANZADERA</option>
                                    <option>NAVES ESPACIALES NO TRIPULADAS</option>
                                    <option>NAVES ESPACIALES TRIPULADAS</option>
                                </select>
                            </div>

                            <div className='org'>
                                <label>Combustibles de la nave.</label>
                                <input
                                    type='text'
                                    name='combustible'
                                    className='inputs'
                                    value={combustible}
                                    onChange={onChange}
                                />
                            </div>
                            <input type='submit' name='enviar' className='guardar' value='Guardar' />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Actividad</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Organización/País</th>
                            <th>Combustibles y agentes oxidantes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {results.map(nave => (
                        <tbody key={nave._id}>
                            <tr>
                                <td>{num++}</td>
                                <td>{nave.actividad}</td>
                                <td>{nave.nombre}</td>
                                <td>{nave.tipo}</td>
                                <td>{nave.entidad}</td>
                                <td>{nave.combustible}</td>
                                <td>
                                    <Button variant="danger" onClick={()=>borrar(nave._id)}>Borrar</Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </Table>
            </div>
        </div>
    )
}

export default Nave