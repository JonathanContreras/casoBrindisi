import React, { useState, useEffect } from "react";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import MotosDataService from "../service/MotosService";
import PedidosDataService from "../service/PedidosSevice";

export const AsignarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosDelDia, setPedidosDelDia] = useState([]);
    const [fecha, setFecha] = useState(new Date());
    const [pedidosPatente, setPedidosPatente] = useState([]);
    const [currentMoto, setCurrentMoto] = useState(null);
    const [motos, setMotos] = useState([]);

    useEffect(() => {
        function padTo2Digits(num) {
            return num.toString().padStart(2, "0");
        }

        const getDate = (date) => {
            const currentDate = new Date(date);
            return [padTo2Digits(currentDate.getDate()), padTo2Digits(currentDate.getMonth() + 1), currentDate.getFullYear()].join("/");
        };
        MotosDataService.getAll().then((data) => {
            console.log("motos");
            console.log(data.data);
            setMotos(data.data.filter((moto) => moto.activa));
        });
        PedidosDataService.getAll().then((data) => {
            console.log("pedidos");
            console.log(data.data);
            setPedidos(data.data);
            setPedidosDelDia(data.data.filter((pedido) => getDate(pedido.fecha_hora_despacho) === getDate(new Date())));
        });
    }, []);

    const updatePedido = (currentPedido, id) => {
        let update = {
            nombre: currentPedido.nombre,
            pedido: currentPedido.pedido,
            direccion: currentPedido.direccion,
            asignado: currentMoto.patente,
            id_pedido: currentPedido.id_pedido,
            fecha_hora_despacho: currentPedido.fecha_hora_despacho,
            tiempo_estimado_entrega: currentPedido.tiempo_estimado_entrega,
            precio: currentPedido.precio,
            estado: "Pendiente",
        };
        PedidosDataService.update(id, update)
            .then((response) => {
                console.log(response.data);
                PedidosDataService.getAll().then((data) => {
                    setPedidos(data.data);

                    const formatedFecha = fecha.toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0];
                    console.log(new Date(pedidos[0].fecha_hora_despacho).toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0]);
                    const listadoPedidosPorFecha = data.data.filter((pedido) => new Date(pedido.fecha_hora_despacho).toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0] === formatedFecha);
                    setPedidosDelDia(listadoPedidosPorFecha);
                    setPedidosPatente(listadoPedidosPorFecha.filter((pedido) => pedido.asignado === currentMoto.patente));
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // const validarDisponibilidad = (idPedido) => {
    //     let valido = true;
    //     const pedidoData = pedidos.find((pedido) => pedido._id === idPedido);
    //     console.log(pedidos);
    //     console.log(pedidoData);
    //     const fechaPedidoMili = new Date(pedidoData.fecha_hora_despacho).getTime();
    //     pedidosPatente.map((pedido) => {
    //         const fechaEntrega = new Date(pedido.fecha_hora_despacho);
    //         const fechaMili = fechaEntrega.getTime();
    //         const estimadoEntrega = fechaMili + pedido.tiempo_estimado_entrega * 60 * 1000;
    //         if (fechaPedidoMili >= fechaMili && fechaPedidoMili <= estimadoEntrega) {
    //             valido = false;
    //         }
    //         console.log(pedido.fecha_hora_despacho);
    //         console.log(fechaEntrega);
    //         console.log(fechaMili);
    //         console.log(estimadoEntrega);
    //         console.log(new Date(estimadoEntrega));
    //     });
    //     console.log(valido);
    //     return valido;
    // };

    const listarPedidosPorPatente = (moto) => {
        setCurrentMoto(moto);
        setPedidosPatente(pedidosDelDia.filter((pedido) => pedido.asignado === moto.patente));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const asignarPedidoMoto = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "pedidoPatente") {
                setPedidosPatente((prevPedidos) => reorder(prevPedidos, source.index, destination.index));
            } else {
                setPedidosDelDia((prevPedidos) => reorder(prevPedidos, source.index, destination.index));
            }

            return;
        }
        if (destination !== null && currentMoto) {
            updatePedido(
                pedidosDelDia.filter((pedido) => pedido._id === draggableId),
                draggableId
            );
        }
    };

    const changeDate = (value) => {
        setFecha(value);
        const formatedFecha = new Date(value).toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0];
        console.log(new Date(pedidos[0].fecha_hora_despacho).toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0]);
        const listadoPedidosPorFecha = pedidos.filter((pedido) => new Date(pedido.fecha_hora_despacho).toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0] === formatedFecha);
        console.log(listadoPedidosPorFecha);
        setPedidosDelDia(listadoPedidosPorFecha);
        setCurrentMoto(null);
        setPedidosPatente([]);
    };

    const listaPedidosAsignados = (
        <Droppable droppableId="pedidoPatente">
            {(droppableProvided) => (
                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                    {pedidosPatente.map((pedido, index) => (
                        <Draggable key={pedido._id + pedido.asignado} draggableId={pedido._id + pedido.asignado} index={index}>
                            {(draggableProvided) => (
                                <div className="card flex justify-content-between flex-wrap flex-column" {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                    <div>
                                        <span className="font-bold">Id de pedido: #{pedido.id_pedido}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Cliente: {pedido.nombre}</span>
                                    </div>
                                    <div>
                                        <span>
                                            Fecha de despacho: {pedido.fecha_hora_despacho.split(", ")[0]} {pedido.fecha_hora_despacho.split(", ")[1]}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Tiempo estimado de entrega: {pedido.tiempo_estimado_entrega} min</span>
                                    </div>
                                    <div>
                                        <span>Entregar en: {pedido.direccion}</span>
                                    </div>
                                    <div>
                                        <span>Estado: {pedido.estado}</span>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    );

    const listaPedidos = (
        <Droppable droppableId="pedido">
            {(droppableProvided) => (
                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                    {pedidosDelDia.map((pedido, index) => (
                        <Draggable key={pedido._id} draggableId={pedido._id} index={index}>
                            {(draggableProvided) => (
                                <div onClick={() => console.log("click")} className="mb-3 flex justify-content-between flex-wrap flex-column" {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                    <Panel
                                        header={
                                            <div>
                                                <div className="mb-2">
                                                    <span className="font-bold">Id de pedido: #{pedido.id_pedido}</span>
                                                </div>
                                                <div>
                                                    <span className="font-normal">Asignado a: {pedido.asignado}</span>
                                                </div>
                                            </div>
                                        }
                                        toggleable
                                        collapsed="true"
                                    >
                                        <div className="flex justify-content-between flex-wrap flex-column">
                                            <div>
                                                <span className="font-bold">Cliente: {pedido.nombre}</span>
                                            </div>
                                            <div>
                                                <span>Detalle:</span>
                                                <ul>
                                                    {JSON.parse(pedido.pedido).map((item, index) => (
                                                        <li key={item.name + index}>{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <span>
                                                    Fecha de despacho: {pedido.fecha_hora_despacho.split(", ")[0]} {pedido.fecha_hora_despacho.split(", ")[1]}
                                                </span>
                                            </div>
                                            <div>
                                                <span>Tiempo estimado de entrega: {pedido.tiempo_estimado_entrega} min</span>
                                            </div>
                                            <div>
                                                <span>Entregar en: {pedido.direccion}</span>
                                            </div>
                                            <div>
                                                <span>Estado: {pedido.estado}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold">Total: {pedido.precio}</span>
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={(result) => asignarPedidoMoto(result)}>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h4 className="font-bold">Asignar pedidos</h4>
                        <p>Seleccione una fecha para gestionar sus pedidos.</p>
                        <Calendar id="time24" value={fecha} minDate={new Date()} onChange={(e) => changeDate(e.value)} showIcon />
                        <p>Seleccione una moto para gestionar sus pedidos asignados.</p>
                        <Dropdown optionLabel="patente" value={currentMoto} options={motos} onChange={(e) => listarPedidosPorPatente(e.value)} placeholder="Selecione una moto" />
                    </div>
                </div>
                <div className="col-12 sm:col-6">
                    <div className="card">
                        <h5 className="font-bold">Listado de pedidos</h5>
                        {listaPedidos}
                    </div>
                </div>
                <div className="col-12 sm:col-6">
                    <div className="card">
                        <h5 className="font-bold">{currentMoto ? "Pedidos asignados a " + currentMoto.patente : "Seleccione una moto"}</h5>
                        {listaPedidosAsignados}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};
