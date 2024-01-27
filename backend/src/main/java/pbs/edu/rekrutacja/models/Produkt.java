package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "PRODUKT")
public class Produkt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prod")
    private Integer idProd;

    @Column(name = "nazwa", unique = true, nullable = false, length = 60)
    private String nazwa;

    @Column(name = "id_producenta", nullable = false)
    private Integer idProducenta;

    @Column(name = "id_kategorii", nullable = false)
    private Integer idKategorii;

    @Column(name = "cena_brutto", nullable = false, precision = 7, scale = 2)
    private BigDecimal cenaBrutto;

    @Column(name = "cena_netto", nullable = false, precision = 7, scale = 2)
    private BigDecimal cenaNetto;

    @Column(name = "vat", nullable = false, precision = 7, scale = 2)
    private BigDecimal vat;

    @Column(name = "okres_gwarancji", nullable = false)
    private Integer okresGwarancji;

    public Produkt() {
    }

    public Produkt(Integer idProd, String nazwa, Integer idProducenta, Integer idKategorii, BigDecimal cenaBrutto, BigDecimal cenaNetto, BigDecimal vat, Integer okresGwarancji) {
        this.idProd = idProd;
        this.nazwa = nazwa;
        this.idProducenta = idProducenta;
        this.idKategorii = idKategorii;
        this.cenaBrutto = cenaBrutto;
        this.cenaNetto = cenaNetto;
        this.vat = vat;
        this.okresGwarancji = okresGwarancji;
    }

    public Integer getIdProd() {
        return idProd;
    }

    public void setIdProd(Integer idProd) {
        this.idProd = idProd;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Integer getIdProducenta() {
        return idProducenta;
    }

    public void setIdProducenta(Integer idProducenta) {
        this.idProducenta = idProducenta;
    }

    public Integer getIdKategorii() {
        return idKategorii;
    }

    public void setIdKategorii(Integer idKategorii) {
        this.idKategorii = idKategorii;
    }

    public BigDecimal getCenaBrutto() {
        return cenaBrutto;
    }

    public void setCenaBrutto(BigDecimal cenaBrutto) {
        this.cenaBrutto = cenaBrutto;
    }

    public BigDecimal getCenaNetto() {
        return cenaNetto;
    }

    public void setCenaNetto(BigDecimal cenaNetto) {
        this.cenaNetto = cenaNetto;
    }

    public BigDecimal getVat() {
        return vat;
    }

    public void setVat(BigDecimal vat) {
        this.vat = vat;
    }

    public Integer getOkresGwarancji() {
        return okresGwarancji;
    }

    public void setOkresGwarancji(Integer okresGwarancji) {
        this.okresGwarancji = okresGwarancji;
    }
}
