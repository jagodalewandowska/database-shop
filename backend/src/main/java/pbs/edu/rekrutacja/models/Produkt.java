package pbs.edu.rekrutacja.models;

import jakarta.persistence.*;


@Entity
@Table(name = "PRODUKT")
public class Produkt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prod")
    private Long id_prod;

    @Column(name = "nazwa", unique = true, nullable = false)
    private String nazwa;

    @Column(name = "id_producenta", nullable = false)
    private Long id_producenta;

    @Column(name = "id_kategorii", nullable = false)
    private Long id_kategorii;

    @Column(name = "cena_brutto", nullable = false)
    private Double cenaBrutto;

    @Column(name = "cena_netto", nullable = false)
    private Double cenaNetto;

    @Column(name = "vat", nullable = false)
    private Double vat;

    @Column(name = "okres_gwarancji", nullable = false)
    private Integer okresGwarancji;

    public Produkt() {
    }

    public Produkt(Long id_prod, String nazwa, Long id_producenta, Long id_kategorii, Double cenaBrutto, Double cenaNetto, Double vat, Integer okresGwarancji) {
        this.id_prod = id_prod;
        this.nazwa = nazwa;
        this.id_producenta = id_producenta;
        this.id_kategorii = id_kategorii;
        this.cenaBrutto = cenaBrutto;
        this.cenaNetto = cenaNetto;
        this.vat = vat;
        this.okresGwarancji = okresGwarancji;
    }

    public Long getId_prod() {
        return id_prod;
    }

    public void setId_prod(Long id_prod) {
        this.id_prod = id_prod;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Long getId_producenta() {
        return id_producenta;
    }

    public void setId_producenta(Long id_producenta) {
        this.id_producenta = id_producenta;
    }

    public Long getId_kategorii() {
        return id_kategorii;
    }

    public void setId_kategorii(Long id_kategorii) {
        this.id_kategorii = id_kategorii;
    }

    public Double getCenaBrutto() {
        return cenaBrutto;
    }

    public void setCenaBrutto(Double cenaBrutto) {
        this.cenaBrutto = cenaBrutto;
    }

    public Double getCenaNetto() {
        return cenaNetto;
    }

    public void setCenaNetto(Double cenaNetto) {
        this.cenaNetto = cenaNetto;
    }

    public Double getVat() {
        return vat;
    }

    public void setVat(Double vat) {
        this.vat = vat;
    }

    public Integer getOkresGwarancji() {
        return okresGwarancji;
    }

    public void setOkresGwarancji(Integer okresGwarancji) {
        this.okresGwarancji = okresGwarancji;
    }
}
