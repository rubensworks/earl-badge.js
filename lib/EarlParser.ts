import {RdfObjectLoader, Resource} from "rdf-object";
import rdfParser from "rdf-parse";
import {Readable} from "stream";

/**
 * An EARL parser for determining compliance levels.
 */
export class EarlParser {

  /**
   * Parses the EARL contents from the given text stream.
   * @param {string} subject The test subject URI that is used within the given EARL file.
   * @param {"stream".internal.Readable} readable A text stream of an EARL file.
   * @param {string} path The file name or path that is being read.
   *                      This is used to determine the content type for parsing.
   * @returns {Promise<IEarlData>} A promise resolving to EARL data containing the compliance factor.
   */
  public async parse(subject: string, readable: Readable, path: string): Promise<IEarlData> {
    const objectLoader = new RdfObjectLoader({ context: require('./context-earl.json') });
    await objectLoader.import(rdfParser.parse(readable, { path , baseIRI: 'http://example.org/' }));

    // Collect all assertions for the given test subject
    const assertions: Resource[] = [];
    for (const resource in objectLoader.resources) {
      if (objectLoader.resources[resource].properties.testSubject
        .some((earlSubject) => earlSubject.term.value === subject)) {
        assertions.push(objectLoader.resources[resource]);
      }
    }

    // Calculate percentage of succeeded tests
    const passed = assertions.reduce((sum, assertion) => {
      const testResult = assertion.property.testResult;
      const resultOutcome = testResult ? testResult.property.resultOutcome : null;
      if (resultOutcome && resultOutcome.value !== 'http://www.w3.org/ns/earl#failed') {
        return sum + 1;
      }
      return sum;
    }, 0);

    return { compliance: assertions.length > 0 ? passed / assertions.length : 0 };
  }

}

export interface IEarlData {
  /**
   * A value between 0 and 1 (inclusive) determining the spec compliance.
   */
  compliance: number;
}
