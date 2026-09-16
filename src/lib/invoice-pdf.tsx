import "server-only";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { BusinessProfile, Invoice } from "@prisma/client";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a252f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: { fontSize: 20, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  muted: { color: "#666" },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    textTransform: "uppercase",
    fontSize: 9,
    color: "#26c6da",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  parties: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  party: { width: "45%" },
  table: { marginTop: 10, borderTop: "1 solid #eee" },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #eee",
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    fontFamily: "Helvetica-Bold",
    borderBottom: "1 solid #1a252f",
  },
  colDesc: { width: "45%" },
  colQty: { width: "15%", textAlign: "right" },
  colUnit: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  totals: { marginTop: 20, alignItems: "flex-end" },
  totalRow: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalFinal: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 4,
    borderTop: "1 solid #1a252f",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  footer: { marginTop: 40, fontSize: 8, color: "#777", lineHeight: 1.5 },
});

function formatEUR(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateInvoicePdf(
  invoice: Invoice,
  profile: BusinessProfile,
) {
  const unitPrice = Number(invoice.unitPrice);
  const totalHT = Number(invoice.totalHT);
  const totalTVA = Number(invoice.totalTVA);
  const totalTTC = Number(invoice.totalTTC);

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Facture {invoice.number}</Text>
            <Text style={styles.muted}>
              Émise le {formatDate(invoice.issueDate)}
            </Text>
            {invoice.serviceDate.getTime() !== invoice.issueDate.getTime() && (
              <Text style={styles.muted}>
                Prestation du {formatDate(invoice.serviceDate)}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.parties}>
          <View style={styles.party}>
            <Text style={styles.sectionTitle}>Émetteur</Text>
            <Text>{profile.legalName}</Text>
            <Text>{profile.address}</Text>
            <Text>SIRET : {profile.siret}</Text>
            <Text>{profile.legalForm}</Text>
            <Text>{profile.email}</Text>
            {profile.phone && <Text>{profile.phone}</Text>}
          </View>
          <View style={styles.party}>
            <Text style={styles.sectionTitle}>Client</Text>
            <Text>{invoice.clientName}</Text>
            <Text>{invoice.clientAddress}</Text>
            <Text>{invoice.clientEmail}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qté</Text>
            <Text style={styles.colUnit}>Prix unit. HT</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colDesc}>{invoice.description}</Text>
            <Text style={styles.colQty}>{invoice.quantity}</Text>
            <Text style={styles.colUnit}>{formatEUR(unitPrice)}</Text>
            <Text style={styles.colTotal}>{formatEUR(totalHT)}</Text>
          </View>
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Total HT</Text>
            <Text>{formatEUR(totalHT)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>
              {profile.vatExempt
                ? "TVA"
                : `TVA (${invoice.vatRate.toString()}%)`}
            </Text>
            <Text>
              {profile.vatExempt ? "Non applicable" : formatEUR(totalTVA)}
            </Text>
          </View>
          <View style={styles.totalFinal}>
            <Text>Total TTC</Text>
            <Text>{formatEUR(totalTTC)}</Text>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.sectionTitle}>Conditions de paiement</Text>
          <Text>Date d&apos;échéance : {formatDate(invoice.dueDate)}</Text>
          <Text>{invoice.paymentTerms}</Text>
          {profile.iban && <Text>IBAN : {profile.iban}</Text>}
        </View>

        <View style={styles.footer}>
          {profile.vatExempt && (
            <Text>TVA non applicable, art. 293 B du CGI.</Text>
          )}
          <Text>
            En cas de retard de paiement, seront exigibles, conformément à
            l&apos;article L 441-10 du Code de commerce, une indemnité
            forfaitaire pour frais de recouvrement de 40 € ainsi que des
            pénalités de retard calculées au taux d&apos;intérêt légal en
            vigueur, majoré de 10 points.
          </Text>
        </View>
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
