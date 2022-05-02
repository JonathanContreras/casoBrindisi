import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PedidosDataService from "../../service/PedidosSevice";
import { useSelector } from "react-redux";

const pedidoData = {
    nombre: "",
    pedido: [],
    direccion: "",
    asignado: "",
    id_pedido: "",
    fecha_hora_despacho: "",
    tiempo_estimado_entrega: "",
    precio: "0",
    estado: "Pendiente",
};
const menuPrices = {
    "Mediterranea S": 3490,
    "Mediterranea M": 5990,
    "Mediterranea XL": 7990,
    "4 quesos S": 3990,
    "4 quesos M": 6490,
    "4 quesos XL": 9490,
    "Vegetariana S": 3490,
    "Vegetariana M": 5990,
    "Vegetariana XL": 7990,
    "Napolitana S": 4990,
    "Napolitana M": 7990,
    "Napolitana XL": 9990,
    "Pepperoni S": 2990,
    "Pepperoni M": 4990,
    "Pepperoni XL": 6990,
    "Coca Cola Lata": 990,
    "Coca Cola 500cc": 1290,
    "Coca Cola 1.5L": 1990,
    "Sprite Lata": 990,
    "Sprite 500cc": 1290,
    "Sprite 1.5L": 1990,
    "Fanta Lata": 990,
    "Fanta 500cc": 1290,
    "Fanta 1.5L": 1990,
    "Jugo Andina 350cc": 990,
    "Jugo Andina 1.5L": 1990,
};
const menuItems = [
    {
        label: "Pizzas",
        code: "PI",
        items: [
            { label: "Mediterranea S", value: "Mediterranea S", precio: 3490 },
            { label: "Mediterranea M", value: "Mediterranea M", precio: 5990 },
            { label: "Mediterranea XL", value: "Mediterranea XL", precio: 7990 },
            { label: "4 quesos S", value: "4 quesos S", precio: 3990 },
            { label: "4 quesos M", value: "4 quesos M", precio: 6490 },
            { label: "4 quesos XL", value: "4 quesos XL", precio: 9490 },
            { label: "Vegetariana S", value: "Vegetariana S", precio: 3490 },
            { label: "Vegetariana M", value: "Vegetariana M", precio: 5990 },
            { label: "Vegetariana XL", value: "Vegetariana XL", precio: 7990 },
            { label: "Napolitana S", value: "Napolitana S", precio: 4990 },
            { label: "Napolitana M", value: "Napolitana M", precio: 7990 },
            { label: "Napolitana XL", value: "Napolitana XL", precio: 9990 },
            { label: "Pepperoni S", value: "Pepperoni S", precio: 2990 },
            { label: "Pepperoni M", value: "Pepperoni M", precio: 4990 },
            { label: "Pepperoni XL", value: "Pepperoni XL", precio: 6990 },
        ],
    },
    {
        label: "Bebidas",
        code: "BE",
        items: [
            { label: "Coca Cola Lata", value: "Coca Cola Lata", precio: 990 },
            { label: "Coca Cola 500cc", value: "Coca Cola 500cc", precio: 1290 },
            { label: "Coca Cola 1.5L", value: "Coca Cola 1.5L", precio: 1990 },
            { label: "Sprite Lata", value: "Sprite Lata", precio: 990 },
            { label: "Sprite 500cc", value: "Sprite 500cc", precio: 1290 },
            { label: "Sprite 1.5L", value: "Sprite 1.5L", precio: 1990 },
            { label: "Fanta Lata", value: "Fanta Lata", precio: 990 },
            { label: "Fanta 500cc", value: "Fanta 500cc", precio: 1290 },
            { label: "Fanta 1.5L", value: "Fanta 1.5L", precio: 1990 },
            { label: "Jugo Andina 350cc", value: "Jugo Andina 350cc", precio: 990 },
            { label: "Jugo Andina 1.5L", value: "Jugo Andina 1.5L", precio: 1990 },
        ],
    },
];

export const GestorPedidos = (props) => {
    const storedData = useSelector((state) => state.motos);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState(null);
    const [currentPedido, setCurrentPedido] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [formPedido, setFormPedido] = useState({ ...pedidoData });

    useEffect(() => {
        PedidosDataService.getAll().then((data) => {
            console.log("pedidos");
            console.log(data.data);
            setPedidos(data.data);
        });
    }, []);

    const deletePedido = (id) => {
        PedidosDataService.delete(id)
            .then((response) => {
                console.log(response.data);
                PedidosDataService.getAll().then((data) => {
                    setPedidos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openNewPedido = () => {
        setFormPedido({ ...pedidoData });
        setCurrentPedido([]);
        setFecha(null);
        setHora(null);
        setDisplayConfirmation(true);
    };

    const agregarPedido = () => {
        const id = pedidos.length > 0 ? pedidos.sort((a, b) => b.id_pedido - a.id_pedido)[0].id_pedido + 1 : 1;
        const formatedFecha = fecha.toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0];
        const formatedHora = hora.toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[1];
        console.log(formatedFecha + ", " + formatedHora);
        const dataPedido = { ...formPedido, pedido: JSON.stringify(currentPedido), asignado: formPedido.asignado.patente, id_pedido: id, fecha_hora_despacho: formatedFecha + ", " + formatedHora };
        PedidosDataService.create(dataPedido)
            .then((response) => {
                console.log(response.data);
                setFormPedido({ ...pedidoData });
                setCurrentPedido([]);
                setDisplayConfirmation(false);
                PedidosDataService.getAll().then((data) => {
                    setPedidos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateData = (data) => {
        console.log(data);
        setFecha(new Date(data.fecha_hora_despacho));
        setHora(new Date(data.fecha_hora_despacho));
        setFormPedido({
            nombre: data.nombre,
            direccion: data.direccion,
            pedido: JSON.parse(data.pedido),
            asignado: storedData.motos.find((moto) => moto.patente === data.asignado),
            id_pedido: data.id_pedido,
            fecha_hora_despacho: data.fecha_hora_despacho,
            tiempo_estimado_entrega: data.tiempo_estimado_entrega,
            precio: data.precio,
            estado: data.estado,
            id: data._id,
        });
        setCurrentPedido(JSON.parse(data.pedido));
        setDisplayUpdate(true);
    };

    const updatePedido = () => {
        const formatedFecha = fecha.toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[0];
        const formatedHora = hora.toLocaleString("en-US", { timeZone: "America/Santiago" }).split(", ")[1];
        let update = {
            nombre: formPedido.nombre,
            pedido: JSON.stringify(currentPedido),
            direccion: formPedido.direccion,
            asignado: formPedido.asignado.patente,
            id_pedido: formPedido.id_pedido,
            fecha_hora_despacho: formatedFecha + ", " + formatedHora,
            tiempo_estimado_entrega: formPedido.tiempo_estimado_entrega,
            precio: formPedido.precio,
            estado: formPedido.estado,
        };
        PedidosDataService.update(formPedido.id, update)
            .then((response) => {
                console.log(response.data);
                setDisplayUpdate(false);
                setFormPedido({ ...pedidoData });

                PedidosDataService.getAll().then((data) => {
                    setPedidos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChange = (type, value) => {
        switch (type) {
            case "id_pedido":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            case "nombre":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            case "direccion":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            case "asignado":
                console.log(value.patente);
                setFormPedido({ ...formPedido, [type]: value });
                break;
            // case "fecha_hora_despacho":
            //     console.log(value.toLocaleString("en-US", { timeZone: "America/Santiago" }));
            //     setFormPedido({ ...formPedido, [type]: value.toLocaleString("en-US", { timeZone: "America/Santiago" }) });
            //     break;
            case "tiempo_estimado_entrega":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            case "precio":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            case "estado":
                setFormPedido({ ...formPedido, [type]: value });
                break;
            default:
                break;
        }
    };

    const confirmationDialogFooter = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} className="p-button-text" />
            <Button type="button" label="Registrar" icon="pi pi-check" onClick={() => agregarPedido()} className="p-button-text" autoFocus />
        </div>
    );

    const updateDialogFooter = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => setDisplayUpdate(false)} className="p-button-text" />
            <Button type="button" label="Actualizar" icon="pi pi-check" onClick={() => updatePedido()} className="p-button-text" autoFocus />
        </div>
    );

    // const listElements = (

    // )

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center country-item">
                <img alt={option.label} src={option.label === "Pizzas" ? "images/pizza.png" : "images/bottle-soda-classic.png"} onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} />
                <div>{option.label}</div>
            </div>
        );
    };

    const onGroupedMenuItem = (e) => {
        console.log(e);
        console.log(currentPedido);
        setCurrentPedido([...currentPedido, { name: e.value, price: menuPrices[e.value] }]);
        setFormPedido({ ...formPedido, precio: (parseInt(formPedido.precio) + parseInt(menuPrices[e.value])).toString() });
        //setSelectedMenuItem(e.value);
    };

    const formPedidoData = (
        <div className="flex align-items-center justify-content-center flex-column">
            <div className="p-fluid">
                {formPedido.id_pedido !== "" && (
                    <div className="field">
                        <label className="font-bold">Numero de Pedido: #{formPedido.id_pedido !== "" ? formPedido.id_pedido : ""}</label>
                    </div>
                )}

                <div className="field">
                    <label htmlFor="Nombre">Nombre Cliente</label>
                    <InputText id="Nombre" type="text" value={formPedido.nombre} onChange={(e) => onChange("nombre", e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="Nombre">Seleccione elementos del pedido</label>
                    <Dropdown value={selectedMenuItem} options={menuItems} onChange={(e) => onGroupedMenuItem(e)} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} />
                    <label className="font-bold mt-4">Pedido actual</label>
                    {currentPedido.map((elemento, index) => (
                        <div key={index} className="flex justify-content-between flex-wrap mb-2 mt-2">
                            <div>{elemento.name}</div>
                            <div className="font-bold">{elemento.price}</div>
                        </div>
                    ))}
                </div>

                <div className="field">
                    <label htmlFor="Direccion">Direccion</label>
                    <InputText id="Direccion" type="text" value={formPedido.direccion} onChange={(e) => onChange("direccion", e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="Asignado">Asignado</label>
                    <Dropdown value={formPedido.asignado} options={storedData.motos.filter((moto) => moto.activa)} onChange={(e) => onChange("asignado", e.value)} optionLabel="patente" />
                </div>
                <div className="field">
                    <label htmlFor="time24">Fecha despacho</label>
                    <Calendar id="time24" value={fecha} minDate={new Date()} onChange={(e) => setFecha(e.value)} showIcon />
                </div>
                <div className="field">
                    <label htmlFor="time12">Hora de despacho</label>
                    <Calendar id="time12" value={hora} onChange={(e) => setHora(e.value)} timeOnly stepMinute={2} hourFormat="24" showIcon icon="pi pi-clock" />
                </div>
                <div className="field">
                    <label htmlFor="tiempo_estimado_entrega">Tiempo estimado de entrega (Min)</label>
                    <InputText id="tiempo_estimado_entrega" type="text" value={formPedido.tiempo_estimado_entrega} onChange={(e) => onChange("tiempo_estimado_entrega", e.target.value)} />
                </div>
                <div className="field">
                    <label className="font-bold">Total: {formPedido.precio} CLP</label>
                </div>
            </div>
        </div>
    );

    return (
        <div className="card">
            <Dialog header="Ingrese un nuevo pedido" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: "350px" }} modal footer={confirmationDialogFooter}>
                {formPedidoData}
            </Dialog>
            <Dialog header="Edite datos del pedido" visible={displayUpdate} onHide={() => setDisplayUpdate(false)} style={{ width: "350px" }} modal footer={updateDialogFooter}>
                {formPedidoData}
            </Dialog>
            <div className="grid formgrid">
                <div className="col-4">
                    <h5>Listado de pedidos</h5>
                </div>
                <div className="col-4 col-offset-4">
                    <Button
                        label="Agregar Pedido"
                        icon="pi pi-plus"
                        className="p-button-primary"
                        onClick={() => {
                            openNewPedido();
                        }}
                    />
                </div>
            </div>
            <h6>Selecione un pedido para ver detalles</h6>
            <DataTable value={pedidos} rows={5} paginator responsiveLayout="scroll">
                <Column field="nombre" header="Cliente" sortable style={{ width: "30%" }} />
                <Column field="direccion" header="Direccion" sortable style={{ width: "35%" }} />
                <Column field="asignado" header="Asignado" sortable style={{ width: "30%" }} />
                <Column
                    field="fecha_hora_despacho"
                    header="Fecha y hora despacho"
                    sortable
                    style={{ width: "35%" }}
                    body={(data) => (
                        <>
                            <p>
                                {" "}
                                {data.fecha_hora_despacho.split(", ")[0]} {data.fecha_hora_despacho.split(", ")[1]}
                            </p>
                        </>
                    )}
                />
                <Column
                    header="Editar"
                    style={{ width: "10%" }}
                    body={(data) => (
                        <>
                            <Button icon="pi pi-pencil" type="button" className="p-button-text" onClick={() => updateData(data)} />
                        </>
                    )}
                />
                <Column
                    header="Eliminar"
                    style={{ width: "10%" }}
                    body={(data) => (
                        <>
                            <Button icon="pi pi-trash" type="button" className="p-button-text p-button-danger " onClick={() => deletePedido(data._id)} />
                        </>
                    )}
                />
            </DataTable>
        </div>
    );
};
