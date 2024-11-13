
async function amortizacionPdf(dataDoc: any): Promise<string> {
    //  console.log('llegamos a retornar pdf-----------', dataDoc);

    const infoDetalle = [];
    const html = `
     <!DOCTYPE html>
    <html>
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.5/paper/bootstrap.min.css" , rel="stylesheet">
               
                   <meta charset="utf-8">
                   
            </head>
             <style>
              body {
                    color: black !important;
                }
                        @media print {
                            body {
                            -webkit - print - color - adjust: exact;
                    color: black !important;

                            }

                        .asociada {
                            background - color: gray !important;
                        font-weight: bold !important;
      
                        }
                        table{
                                    border: solid 1px gray !important;
                                    border-radius: 20px !important;
                                    font-size: 8px !important;
                                }
                    }
                    </style>

            <body style="font-size: 9px;">
                <div class="container" style="margin-top:10px; ">
                    <div class="col-xs-12" >
                        <div class="row">
                            <div class="col-xs-12" style="text-align: center;">
                                <img src=${dataDoc.logo} alt="Girl in a jacket" style="width: auto; border-radius: 5px;" height="100" >
                                
                                <h4 style="margin-top:20px;"> <strong>TABLA DE AMORTIZACIÓN </strong></h4>
                                
                                <div class="col-xs-6" style="width: 100%; display: block; margin-top: 20px;  padding:5px 0px">
                                   
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <p style="color:black"> <strong>Fecha de consulta : </strong> ${formatDate(dataDoc.dateNow, "yyyy-MM-dd HH:mm:ss")}</p>
                                        </div>
                                        <div class="col-xs-8" style="text-align: rigth;">
                                            <p style="text-align: rigth;"><strong> Número de crédito : </strong> ${dataDoc.creditNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin: 20px auto 0px auto">
                           
                            <div class="col-xs-11.5" style="border: 1px solid #000; border-radius: 5px; padding:5px 20px">
                                <div class="row">
                                    <div class="col-xs-5">
                                        <p> <strong>Socio :</strong> ${dataDoc.dataTop.name}</p>
                                        <p> <strong>Identificación :</strong>${dataDoc.dataTop.dni}</p>
                                    </div>
                                    <div class="col-xs-4">
                                    <p> <strong>Fecha de inicio :</strong> ${formatDate(dataDoc.dataTop.dateInitial, "yyyy-MM-dd")}</p>
                                        <p> <strong>Tipo de crédito :</strong>${dataDoc.dataTop.typeCredit}</p>
                                    </div>
                                    <div class="col-xs-3">
                                        <p> <strong>Tasa de interés:</strong>${dataDoc.dataTop.tazInt}</p>
                                        <p> <strong>Plazo en meses :</strong>${dataDoc.dataTop.numMonth}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>N</th>
                                            <th>Fecha de Pago</th>
                                            <th>Capital</th>
                                            <th>Interés</th>
                                            <th>Rubro</th>
                                            <th>Pago</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${dataDoc.data.map((element: { numero: any; fecha: Date; capital: number; interes: number; rubros: number; pago: number; total: number; }) =>
        `<tr> 
                                                <td >${element.numero}</td>
                                                <td> ${formatDate(element.fecha, "yyyy-MM-dd")} </td>
                                                <td> $ ${element.capital.toFixed(2)} </td>
                                                <td> $ ${element.interes.toFixed(2)} </td>
                                                <td> $ ${element.rubros.toFixed(2)} </td>
                                                <td> $ ${element.pago.toFixed(2)} </td>
                                                <td> $ ${element.total.toFixed(2)} </td>
                                            </tr>`
    ).join('')}
                                            <tr> 
                                                <td></td>
                                                <td> <b>TOTALES</b> </td>
                                                <td><b>${dataDoc.dataBot.totalCa}</b>  </td>
                                                <td><b>${dataDoc.dataBot.totalIn} </b> </td>
                                                <td><b>${dataDoc.dataBot.totalRu}</b>  </td>
                                                <td><b>${dataDoc.dataBot.totalCu}</b> </td>
                                                <td><b>${dataDoc.dataBot.totalTo}</b>  </td>
                                            </tr>
                                    </tbody>
                                </table>

                            </div>
                            </div>


                            </div>
                        </div>
                    </body >
                </html >
    `;
    return html;
}
function formatDate(fecha: Date, formato: string): string {
    let opcionesFormato: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    let dateResult;
    // Verificar si el formato incluye la hora
    if (formato.includes('HH') || formato.includes('hh')) {
        dateResult = fecha.toLocaleString('es-ES', opcionesFormato);

    } else {
        dateResult = (fecha.toLocaleString('es-ES', opcionesFormato)).split("T")[0];

    }
    return dateResult
}
export default amortizacionPdf;