const { getLanguageById, submitBatch } = require("../utils/problemUtility");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    for (const { language, completeCode } of referenceSolution) {
      //sourcecode
      //language_id
      //stdin
      //expectedOutput

      const languageId = getLanguageById(language);

      //Creating batch submission
      const submissions = visibleTestCases.map((input, output) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submitResult = await submitBatch(submissions);
    }
  } catch (err) {}
};
