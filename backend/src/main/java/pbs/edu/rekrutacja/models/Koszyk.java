package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;

@Entity
@Table(name = "KOSZYK")
@IdClass(KoszykClass.class)
public class Koszyk {

    @Id
    @Column(name = "id_klienta")
    private Integer idKlienta;

    @Id
    @Column(name = "id_prod")
    private Integer idProd;

    @Column(name = "ilosc", nullable = false)
    private Integer ilosc;

    @Column(name = "cena_jednostkowa", nullable = false)
    private Double cenaJednostkowa;


    public Koszyk() {
    }

    public Koszyk(Integer idKlienta, Integer idProd, Integer ilosc, Double cenaJednostkowa) {
        this.idKlienta = idKlienta;
        this.idProd = idProd;
        this.ilosc = ilosc;
        this.cenaJednostkowa = cenaJednostkowa;
    }

    public Integer getIdKlienta() {
        return idKlienta;
    }

    public void setIdKlienta(Integer idKlienta) {
        this.idKlienta = idKlienta;
    }

    public Integer getIdProd() {
        return idProd;
    }

    public void setIdProd(Integer idProd) {
        this.idProd = idProd;
    }

    public Integer getIlosc() {
        return ilosc;
    }

    public void setIlosc(Integer ilosc) {
        this.ilosc = ilosc;
    }

    public Double getCenaJednostkowa() {
        return cenaJednostkowa;
    }

    public void setCenaJednostkowa(Double cenaJednostkowa) {
        this.cenaJednostkowa = cenaJednostkowa;
    }
}

