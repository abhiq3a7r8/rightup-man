import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    width: 595,
    height: 842,
    backgroundColor: "#ffffff", // Plain white A4 page
    padding: 0,
  },
  header: {
    height: 82,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Times-Roman",
  },
  body: {
    flex: 1,
    paddingHorizontal: 32,
    
  },
  section: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    marginBottom: 12,
    textAlign: "justify",
    
  },
  label: {
    fontWeight: "bold",
  },
});

export default function Pdf({ aim, theory, conclusion }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPERIMENT NO.</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.section}>
            <Text>
              <Text style={styles.label}>Aim: </Text>
              {aim}
            </Text>
          </View>

          <View style={styles.section}>
              <Text style={styles.label}>Theory: </Text>
              <Text>{theory}</Text>
          </View>

          <View style={styles.section}>
            
              <Text style={styles.label}>Conclusion: </Text>
              <Text>{conclusion}</Text>
            
          </View>
        </View>
      </Page>
    </Document>
  );
}
