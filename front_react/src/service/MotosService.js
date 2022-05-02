import http from "./http-common";

class MotosDataService {
    getAll() {
        return http.get("/motos");
    }

    get(id) {
        return http.get(`/motos/${id}`);
    }

    create(data) {
        return http.post("/motos", data);
    }

    update(id, data) {
        return http.put(`/motos/${id}`, data);
    }

    delete(id) {
        return http.delete(`/motos/${id}`);
    }

    deleteAll() {
        return http.delete(`/motos`);
    }

    findByTitle(title) {
        return http.get(`/motos?title=${title}`);
    }
}

export default new MotosDataService();
