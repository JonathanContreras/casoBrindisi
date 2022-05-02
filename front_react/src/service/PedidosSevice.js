import http from "./http-common";

class PedidosDataService {
    getAll() {
        return http.get("/pedidos");
    }

    get(id) {
        return http.get(`/pedidos/${id}`);
    }

    create(data) {
        return http.post("/pedidos", data);
    }

    update(id, data) {
        return http.put(`/pedidos/${id}`, data);
    }

    delete(id) {
        return http.delete(`/pedidos/${id}`);
    }

    deleteAll() {
        return http.delete(`/pedidos`);
    }

    findByTitle(title) {
        return http.get(`/pedidos?title=${title}`);
    }
}

export default new PedidosDataService();
