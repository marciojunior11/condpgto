import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, makeStyles } from "@material-ui/core";
import DataTable from '../../components/dataTable/index'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    }
}));

const columns = [
    {
        name: 'Parcela',
        selector: row => row.numParcela,
    },
    {
        name: 'Dias',
        selector: row => row.numDias,
    },
    {
        name: 'Percent. Parcela',
        selector: row => row.percParcela,
    },
];

const valuesCondPgto = {
    id: 0,
    descricao: '',
    taxDesconto: 0.00,
    taxMulta: 0.00,
    taxJuros: 0.00,
    parcelas: []
};

const valuesParcela = {
    numParcela: 0,
    numDias: 0,
    percParcela: 0.00
}

export default () => {

    const [colCondPgto, setColCondPgto] = useState([]);
    const [parcelasCond, setParcelasCond] = useState([]);
    const [condPgto, setCondPgto] = useState(valuesCondPgto);
    const [parcela, setParcela] = useState(valuesParcela);
    const [numParcelas, setNumParcelas] = useState(0);
    const classes = useStyles();

    const handleInputChange = (event) => {
        console.log("CONDICAO", condPgto)
        const { name, value } = event.target;
        setCondPgto({
            ...condPgto,
            [name]:value
        })
    }

    const gerarParcelas = () => {
        const mParcelasCond = [];
        if (parcelasCond.length == 0) {
            const percentual = parseFloat((100/numParcelas).toFixed(2));
            var percTotal = 0.00;
            for (let i = 1; i <= numParcelas; i++) {
                let mParcela = {};
                mParcela.numParcela = i;
                mParcela.percParcela = percentual;
                percTotal = percTotal + percentual;
                if ((i == numParcelas) && (percTotal != 100)) {
                    if (percTotal < 100) {
                        mParcela.percParcela = parseFloat((mParcela.percParcela + (100 - percTotal)).toFixed(2));
                    } else {
                        mParcela.percParcela = parseFloat((mParcela.percParcela - (percTotal - 100)).toFixed(2));
                    }
                }
                console.log(percTotal);
                mParcelasCond.push(mParcela);
            }
        }
        setParcelasCond(mParcelasCond);
        setCondPgto({
            ...condPgto,
            parcelas:mParcelasCond
        })
        console.log(condPgto);
    }

    return (
        <div>
            <Grid container className={classes.root} justifyContent='center' spacing={2}>
                <Grid item lg={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item lg={2} md={3} sm={3} xs={3}>
                            <TextField
                                name="id"
                                label="Código" 
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                            />
                        </Grid>
                        <Grid item lg={10} md={9} sm={9} xs={9}>
                            <TextField
                                name="descricao"
                                label="Descrição"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <TextField
                                name="numParcelas"
                                label="Parcelas"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(event) => {
                                    setNumParcelas(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth size="medium"
                                onClick={() => {
                                    gerarParcelas();
                                }}
                            >
                                Gerar
                            </Button>
                        </Grid>
                        {parcelasCond.length > 0 ? (
                            <Grid item lg={12}>
                                <DataTable
                                    columns={columns}
                                    data={parcelasCond}
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}