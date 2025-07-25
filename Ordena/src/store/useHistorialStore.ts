import {create } from "zustand";
import { persist } from "zustand/middleware";


//Importacion de los archivos services
import  {historialService}  from "../services/historialService";
import { HistProductService } from "../services/historialService";

//import { Create } from "@mui/icons-material";



//Definición de interfaces


export interface ProductoSolicitud {
  id_solc_prod: number;
  cantidad: string;
  producto_fk: number;
  producto_nombre: string;
  producto_codigo: string;
}


interface Solicitud {
  id_solc: number;
  fecha_creacion: string;
  observacion: string; 
  productos:ProductoSolicitud[];
  usuario_nombre: string;
}

export interface DetallePedido {
  id: number;
  cantidad: string;
  descripcion: string;
  productos_pedido_fk: number;
  producto_nombre: string;
  producto_codigo: string;
}

interface Bodega {
  id_bdg: number;
  nombre_bdg: string;
  direccion: string;
  
}

interface Sucursal {
  id: number;
  nombre_sucursal: string;
  direccion: string;
  descripcion: string;
  
}

interface PersonalEntrega {
  id_psn: number;
  nombre_psn: string;
  descripcion: string;
}



export interface Pedidos{
    id_p:number;
    descripcion: string;
    fecha_entrega: string;
    estado_pedido_fk?: number;
    sucursal_fk?: Sucursal;
    personal_entrega_fk?: PersonalEntrega;
    usuario_fk: number;
    solicitud_fk?: Solicitud;
    bodega_fk: Bodega;
    proveedor_fk?: number;
    detalles_pedido?:DetallePedido[];
    // Campos opcionales agregados por el backend para mostrar nombres y tipo
    sucursal_nombre?: string;
    usuario_nombre?: string;
    estado_pedido_nombre?: string;
    proveedor_nombre?: string;
    personal_entrega_nombre?: string;
    tipo?: string;
}

interface HistorialState {
    pedidos: Pedidos[];
    loading: boolean;
    error: string | null;
    fetchPedidos: (params?: { bodega_id?: string; sucursal_id?: string }) => Promise<void>;
}


//Constante para obtener los datos para el historial de pedidos, mediante la creación de un store(contenedor centralizado)
export const useHistorialStore = create<HistorialState>()(
    //guardar estado del store
    persist(
        (set) => ({
            pedidos: [],
            loading: false,
            error: null,

            //llamada a la api
            fetchPedidos: async (params = {}) => {
                set({ loading: true, error: null });
                try {
                    const dataRaw = await historialService.getPedidos(params);
                    const data = Array.isArray(dataRaw)
                        ? dataRaw
                        : dataRaw.results || [];
                    set({ pedidos: data, loading: false });
                } catch (error: unknown) {
                    let errorMessage ="Error al obtener pedidos";
                    if (error instanceof Error) { 
                        errorMessage = error.message;
                    }
                    set({error: errorMessage,loading:false});
                }
            },

        }),
        { name: "historial-storage" }
    )
);


///////////////////////////////////////////////


//Sección para stock de pedidos


//Definición Interfaces
export interface Productos {
  id_prodc: number;
  nombre_prodc: string;
  code: string;
  brand: string;
  category: string;
  description: string;
  stock: number;
  stock_minimo:number;
  bodega_fk:number;
  im: File | string | null;
}



interface productStock {
    productos: Productos[];
    loading: boolean;
    error: string | null;
    fetchProducts:(params?: {bodega_id?:string})=>Promise<void>;
}


//Constante para obtener los datos para el stock de productos, mediante la creación de un store(contenedor centralizado)
export const useHistProductStore =
create<productStock>()(
        //guardar estado del store

    persist(
        (set) => ({
            productos:[],
            loading:false,
            error:null,
            fetchProducts:async (params = {}) => {

                set({loading:true,error:null});
                try {
                    const data = await HistProductService.getProducts(params);
                    if (data && data.length > 0) {
                        console.log("DEBUG: Primer producto recibido de la API:", data[0]);
                    }
                    set({productos:data,loading:false});

                //seccion error

                } catch (error:unknown){
                    let errorMessage = "Error al obtener productos";
                    if (error instanceof Error) { 
                    errorMessage = error.message;
                    }
                    set({error: errorMessage,loading:false});
                }

            },
        }),
        {name:"productos-storage"}
    )
);