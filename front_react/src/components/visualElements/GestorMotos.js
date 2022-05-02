import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import MotosDataService from "../../service/MotosService";
import { useDispatch } from "react-redux";
import { SET_MOTOS } from "../../redux/actions/motosActions";

const motoData = {
    patente: "",
    chofer: "",
    activa: true,
};

export const GestorMotos = (props) => {
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [motos, setMotos] = useState([]);
    const [formMoto, setFormMoto] = useState({ ...motoData });
    const dispatch = useDispatch();

    useEffect(() => {
        MotosDataService.getAll().then((data) => {
            console.log("motos");
            console.log(data.data);
            dispatch(SET_MOTOS(data.data));
            setMotos(data.data);
        });
    }, [dispatch]);

    const deleteMoto = (id) => {
        MotosDataService.delete(id)
            .then((response) => {
                console.log(response.data);
                MotosDataService.getAll().then((data) => {
                    setMotos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const agregarMotocicleta = () => {
        MotosDataService.create(formMoto)
            .then((response) => {
                console.log(response.data);
                setFormMoto({ ...motoData });
                setDisplayConfirmation(false);
                MotosDataService.getAll().then((data) => {
                    setMotos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateData = (data) => {
        setFormMoto({
            patente: data.patente,
            chofer: data.chofer,
            activa: data.activa,
            id: data._id,
        });
        setDisplayUpdate(true);
    };

    const updateMoto = () => {
        let update = {
            patente: formMoto.patente,
            chofer: formMoto.chofer,
            activa: formMoto.activa,
        };
        MotosDataService.update(formMoto.id, update)
            .then((response) => {
                console.log(response.data);
                setFormMoto({ ...motoData });
                setDisplayUpdate(false);
                MotosDataService.getAll().then((data) => {
                    setMotos(data.data);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChange = (type, value) => {
        switch (type) {
            case "patente":
                setFormMoto({ ...formMoto, [type]: value });
                break;
            case "chofer":
                setFormMoto({ ...formMoto, [type]: value });
                break;
            case "activa":
                setFormMoto({ ...formMoto, [type]: value });
                break;
            default:
                break;
        }
    };

    const confirmationDialogFooter = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} className="p-button-text" />
            <Button type="button" label="Registrar" icon="pi pi-check" onClick={() => agregarMotocicleta()} className="p-button-text" autoFocus />
        </div>
    );

    const updateDialogFooter = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => setDisplayUpdate(false)} className="p-button-text" />
            <Button type="button" label="Actualizar" icon="pi pi-check" onClick={() => updateMoto()} className="p-button-text" autoFocus />
        </div>
    );

    const formMotoData = (
        <div className="flex align-items-center justify-content-center flex-column">
            <div className="card p-fluid">
                <h5>Campos obligatorios</h5>
                <div className="field">
                    <label htmlFor="Patente">Patente</label>
                    <InputText id="Patente" type="text" value={formMoto.patente} onChange={(e) => onChange("patente", e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="Encargado">Encargado</label>
                    <InputText id="Encargado" type="text" value={formMoto.chofer} onChange={(e) => onChange("chofer", e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="Activa">Activa</label>
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option1" name="option" value={true} checked={formMoto.activa} onChange={(e) => onChange("activa", e.value)} />
                                <label htmlFor="option1">Si</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-6">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option2" name="option" value={false} checked={!formMoto.activa} onChange={(e) => onChange("activa", e.value)} />
                                <label htmlFor="option2">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="card">
            <Dialog header="Ingrese datos de nueva motocicleta" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: "350px" }} modal footer={confirmationDialogFooter}>
                {formMotoData}
            </Dialog>
            <Dialog header="Edite datos de motocicleta" visible={displayUpdate} onHide={() => setDisplayUpdate(false)} style={{ width: "350px" }} modal footer={updateDialogFooter}>
                {formMotoData}
            </Dialog>
            <div className="grid formgrid">
                <div className="col-4">
                    <h5>Listado de motos</h5>
                </div>
                <div className="col-4 col-offset-4">
                    <Button
                        label="Agregar Moto"
                        icon="pi pi-plus"
                        className="p-button-primary"
                        onClick={() => {
                            setFormMoto({ ...motoData });
                            setDisplayConfirmation(true);
                        }}
                    />
                </div>
            </div>
            <h6>Selecione una moto para ver detalles</h6>
            <DataTable value={motos} rows={5} paginator responsiveLayout="scroll">
                <Column
                    field="patente"
                    header="Patente"
                    sortable
                    style={{ width: "30%" }}
                    body={(data) => (
                        <>
                            <p className={data.activa ? "text-green-400 font-bold" : "text-pink-600 font-bold"}>{data.patente}</p>
                        </>
                    )}
                />
                <Column field="chofer" header="Encargado" sortable style={{ width: "35%" }} />
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
                            <Button icon="pi pi-trash" type="button" className="p-button-text p-button-danger " onClick={() => deleteMoto(data._id)} />
                        </>
                    )}
                />
            </DataTable>
        </div>
    );
};
